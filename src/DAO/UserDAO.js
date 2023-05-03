const db = require("../../database");
const bcrypt = require("../utils/bcrypt");
const changepass = require("../utils/findPassword");
const Usuario = require("../models/Usuario");
const Perfil = require("../models/Perfil");
const { validationResult } = require("express-validator");

const createUser = async (req, res, next) => {
  try {
    console.log(req.body)
    const errors = await validationResult(req); // Encuentra los errores de validación en esta solicitud y los envuelve en un objeto

    if (!errors.isEmpty())
      return res
        .status(422)
        .json({ errors: errors.array(), error: "Email inválido" });

    const { nombre, apellido, apodo, email, password, rol, image } = req.body;
    const sql_usuario = `INSERT INTO usuarios(email,password,rol,fecha) VALUES($email,$password,$rol,datetime('now'))`;
    const usuario = new Usuario(email, await bcrypt.encrypt(password), rol);
    const usr = {
      $email: usuario.email,
      $password: usuario.password,
      $rol: usuario.rol,
    };
    usuario.actionsUser(sql_usuario, usr);

    const sql_perfil = `INSERT INTO perfil(nombre, apellido, apodo, foto, id_usuario) VALUES($nombre, $apellido, $apodo, $foto, (SELECT id FROM usuarios WHERE ROWID IN (SELECT max(ROWID) FROM usuarios)))`;
    const perfil = new Perfil(nombre, apellido, apodo, image);
    const prf = {
      $nombre: perfil.nombre,
      $apellido: perfil.apellido,
      $apodo: perfil.apodo,
      $foto: perfil.image,
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
const getUsers = async (req, res, next) => {
  const sql =
    "SELECT usuarios.id,nombre,apellido,apodo,email,password,rol,foto,fecha FROM usuarios INNER JOIN perfil ON usuarios.id=perfil.id_usuario;";
  const params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
};
const updateUser = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const sql_usuario = `UPDATE usuarios SET email=$email, password=$password, rol=$rol, fecha=datetime('now') WHERE id=${id}`;
    const usuario = new Usuario(
      req.body.email,
      await bcrypt.encrypt(req.body.password),
      req.body.rol
    );
    const usr = {
      $email: usuario.email,
      $password: usuario.password,
      $rol: usuario.rol,
    };
    usuario.actionsUser(sql_usuario, usr);
    const sql_perfil = `UPDATE perfil SET nombre=$nombre, apellido=$apellido, apodo=$apodo,foto=$foto WHERE id_usuario=${id}`;
    const perfil = new Perfil(
      req.body.nombre,
      req.body.apellido,
      req.body.apodo,
      req.body.foto
    );
    const prf = {
      $nombre: perfil.nombre,
      $apellido: perfil.apellido,
      $apodo: perfil.apodo,
      $foto: perfil.foto,
    };
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

const deleteUser = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const sql = `DELETE FROM usuarios WHERE usuarios.id=${id}; DELETE FROM perfil WHERE perfil.id_usuario=${id}`;
    const stm = db.prepare(sql, (error) => {
      if (error) {
        throw new Error(error.message);
      }
    });
    stm.run((error) => {
      if (error) {
        throw new Error(error.message);
      }
      res.json({ message: "Usuario borrado con éxito!", id: id });
    });
    stm.finalize();
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

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  changePassword,
};
