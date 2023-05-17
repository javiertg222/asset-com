
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
    const sql = `INSERT INTO configuracion(titulo, image) VALUES($titulo,$image)`;
    const { titulo, image } = req.body;
    const configuracion = new Configuracion(titulo, image);

    const config = {
      $titulo: configuracion.titulo,
      $image: req.file
        ? `${process.env.URL}:${process.env.PORT}/public/${req.file.filename}`
        : "",
    };
    configuracion.actionsConfiguracion(sql, config);
    res.json({ message: "Configuración añadida con éxito!" });
  } catch (error) {
    console.log(error.message);
  }
};

const updateConfiguration = (req, res, next) => {
  try {
    //Recupero el id que viene como parámetro en la ruta
    const id = Number(req.params.id);
    //Consulta sql
    let sql = `UPDATE configuracion SET titulo=$titulo WHERE id=${id}`;
    const { titulo, image } = req.body;
    const configuracion = new Configuracion(titulo, image);

    //Datos a modificar en la tabla
    let config = {
      $titulo: configuracion.titulo,
    };

    //Evaluo si se cambia la imagen o se deja la misma
    if (req.file) {
      sql = `UPDATE configuracion SET titulo=$titulo, image=$image WHERE id=${id}`;
      config = {
        $titulo: req.body.titulo,
        $image: `${process.env.URL}:${process.env.PORT}/public/${req.file.filename}`,
      };
      //Elimino la imagen del servidor
      deleteUploads(id, "SELECT image FROM configuracion WHERE id = ?");
    }

    configuracion.actionsConfiguracion(sql, config);
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
