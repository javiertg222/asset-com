
const { deleteUploads } = require("../utils/deleteUploads");
const Configuracion = require("../models/Configuracion");
/**
 * Obtener la configuración personalizada de la app
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getConfiguration = async (req, res, next) => {
  try {
    const sql = "SELECT * from configuracion";
    const configuracion = new Configuracion();
    configuracion.getConfiguracion(sql, res);
  } catch (error) {
    console.log(error.message);
  }
};

const createConfiguration = async (req, res, next) => {
  try {
    const id_usuario=Number(req.params.id_usuario)
    const sql_config = `INSERT INTO configuracion(titulo, image) VALUES($titulo,$image)`;
    const sql_user= `UPDATE usuarios SET id_configuracion = (SELECT id FROM configuracion WHERE ROWID IN (SELECT max(ROWID) FROM configuracion)) WHERE id=$id_usuario`
    const id_user= {$id_usuario: id_usuario} 
    const { titulo, image } = req.body;
    const configuracion = new Configuracion(titulo, image);

    const config = {
      $titulo: configuracion.titulo,
      $image: req.file
        ? `${process.env.URL}:${process.env.PORT}/public/${req.file.filename}`
        : "",
    };
    configuracion.actionsConfiguracion(sql_config, config);
    configuracion.actionsConfiguracion(sql_user, id_user)
    res.json({ message: "Configuración añadida con éxito!" });
  } catch (error) {
    console.log(error.message);
  }
};

const updateConfiguration = (req, res, next) => {
  try {
    //Recupero el id y el id_usuario que viene como parámetro en la ruta
    const id = Number(req.params.id);
    const id_usuario=Number(req.params.id_usuario)
    //Consulta sql
    let sql_config = `UPDATE configuracion SET titulo=$titulo WHERE id=${id}`;
    const sql_user= `UPDATE usuarios SET id_configuracion = $id_configuracion WHERE id=$id_usuario`
    const user={$id_configuracion: id, $id_usuario: id_usuario}
    const { titulo, image } = req.body;
    const configuracion = new Configuracion(titulo, image);

    //Datos a modificar en la tabla
    let config = {
      $titulo: configuracion.titulo,
    };

    //Evaluo si se cambia la imagen o se deja la misma
    if (req.file) {
      sql_config = `UPDATE configuracion SET titulo=$titulo, image=$image WHERE id=${id}`;
      config = {
        $titulo: req.body.titulo,
        $image: `${process.env.URL}:${process.env.PORT}/public/${req.file.filename}`,
      };
      //Elimino la imagen del servidor
      deleteUploads(id, "SELECT image FROM configuracion WHERE id = ?");
    }

    configuracion.actionsConfiguracion(sql_config, config);
    configuracion.actionsConfiguracion(sql_user, user);
    res.json({ message: "Configuración modificada con éxito!" });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  createConfiguration,
  getConfiguration,
  updateConfiguration,
};
