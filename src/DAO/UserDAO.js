const db = require("../../database");
const bcrypt = require("../utils/bcrypt");
const changepass = require("../utils/findPassword");
const Usuario = require("../models/Usuario");
const Perfil = require("../models/Perfil");
const { deleteUploads } = require("../utils/deleteUploads");
const { findEmail } = require("../utils/findEmail");
const { createToken } = require("../utils/createToken");
/**
 * Método para crear usuarios
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const createUser = async (req, res, next) => {
  try {
    const { nombre, apellido, apodo, email, password, rol, image } = req.body;
    const sql_usuario = `INSERT INTO usuarios(email,password,rol,fecha) VALUES($email,$password,$rol,datetime('now'))`;
    const usuario = new Usuario(email, await bcrypt.encrypt(password), rol);
    const usr = {
      $email: usuario.email,
      $password: usuario.password,
      $rol: usuario.rol,
    };
    usuario.actionsUser(sql_usuario, usr);

    const sql_perfil = `INSERT INTO perfil(nombre, apellido, apodo, image, id_usuario) VALUES($nombre, $apellido, $apodo, $image, (SELECT id FROM usuarios WHERE ROWID IN (SELECT max(ROWID) FROM usuarios)))`;
    const perfil = new Perfil(nombre, apellido, apodo, image);
    const prf = {
      $nombre: perfil.nombre,
      $apellido: perfil.apellido,
      $apodo: perfil.apodo,
      $image: req.file
        ? `${process.env.URL}:${process.env.PORT}/public/${req.file.filename}`
        : "",
    };

    perfil.actionsPerfil(sql_perfil, prf);
    res.json({ message: "Usuario creado con éxito!" });
  } catch (error) {
    console.log(error.message);
  }
};

const getUser = async (req, res, next) => {
  const sql = "SELECT * FROM usuarios WHERE id = ?";
  const params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(row);
  });
};
/**
 * Obtener los usuarios de la aplicación
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getUsers = async (req, res, next) => {
  const sql =
    "SELECT usuarios.id,nombre,apellido,apodo,email,password,rol,image,fecha FROM usuarios INNER JOIN perfil ON usuarios.id=perfil.id_usuario;";
  const params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
};
/**
 * Modificar usuarios
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const updateUser = async (req, res, next) => {
  try {
    const { nombre, apellido, apodo, email, rol, image } = req.body;
    const id = Number(req.params.id);

    const sql_usuario = `UPDATE usuarios SET email=$email, rol=$rol, fecha=datetime('now') WHERE id=${id}`;
    const usuario = new Usuario(email, "", rol);
    const usr = {
      $email: usuario.email,
      $rol: usuario.rol,
    };
    usuario.actionsUser(sql_usuario, usr);

    const perfil = new Perfil(nombre, apellido, apodo, image);
    let sql_perfil = "";
    let prf = {};

    //Evaluo si se cambia la imagen o se deja la misma
    if (req.file) {
      sql_perfil = `UPDATE perfil SET nombre=$nombre, apellido=$apellido, apodo=$apodo,image=$image WHERE id_usuario=${id}`;

      prf = {
        $nombre: perfil.nombre,
        $apellido: perfil.apellido,
        $apodo: perfil.apodo,
        $image: `${process.env.URL}:${process.env.PORT}/public/${req.file.filename}`,
      };
      //Elimino la imagen del servidor
      deleteUploads(id, "SELECT image FROM perfil WHERE id_usuario = ?");
    } else {
      sql_perfil = `UPDATE perfil SET nombre=$nombre, apellido=$apellido, apodo=$apodo WHERE id_usuario=${id}`;
      prf = {
        $nombre: perfil.nombre,
        $apellido: perfil.apellido,
        $apodo: perfil.apodo,
      };
    }
    perfil.actionsPerfil(sql_perfil, prf);

    res.json({
      message: "Usuario modificado con éxito!",
      usuario: usuario,
      perfil: perfil,
    });
  } catch (error) {
    console.log(error.message);
  }
};
/**
 * Método para borrar usuarios
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const deleteUser = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const sqls = [
      `DELETE FROM usuarios WHERE usuarios.id=${id}`,
      `DELETE FROM perfil WHERE perfil.id_usuario=${id}`,
    ];

    sqls.map((sql) => {
      const stm = db.prepare(sql, (error) => {
        if (error) {
          throw new Error(error.message);
        }
      });
      stm.run((error) => {
        if (error) {
          throw new Error(error.message);
        }
      });
      stm.finalize();
    });
    //Elimino la imagen del servidor
    deleteUploads(id, "SELECT image FROM perfil WHERE id_usuario = ?");
    res.json({ message: "Usuario borrado con éxito!", id: id });
  } catch (error) {
    console.log(error.message);
  }
};

const changePassword = async (req, res) => {
  const id = Number(req.params.id);
  const users = req.body;
  const password = req.body.password;

  if (!changepass.findPassword(password, users)) {
    res.json({ mesage: "La contraseña no se encuentra" });
  } else {
    let sql = `UPDATE usuarios SET password=$password,fecha=datetime('now') WHERE id=${id}`;
    let data = {
      $password: await bcrypt.encrypt(req.body.password),
    };
    const stm = db.prepare(sql, (error) => {
      if (error) {
        throw new Error(error.message);
      }
    });

    stm.run(data, (error) => {
      if (error) {
        throw new Error(error.message);
      } else {
        res.json({
          message: "success",
          data: data,
        });
      }
    });
    stm.finalize();
  }
};

/**
 * Valida las credenciales y crea un token
 * @param {*} req
 * @param {*} res
 */
const login = async (req, res) => {
  const credentials = {
    email: req.body.email,
    password: req.body.password,
  };

  //Recupero todos los datos de los usuarios para comprobar que el email y password existen.
  db.all(
    "SELECT usuarios.id, email,password, rol, nombre, apodo FROM usuarios INNER JOIN perfil ON usuarios.id=perfil.id_usuario",
    async (err, users) => {
      if (err) {
        console.log(err.message);
      }
      const user = await findEmail(credentials.email, users);
      if (!user) {
        return res.json({ mensaje: "Usuario inválido" });
      }
      const validPassword = await bcrypt.compare(
        credentials.password,
        user.password
      );
      if (!validPassword) {
        return res.json({ mensaje: "Contraseña incorrecta" });
      } else {
        //Crear token
        const token = createToken(user);

        res.json({
          mensaje: "Usuario autenticado correctamente",
          token: token,
        });
      }
    }
  );
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  changePassword,
  login,
};
