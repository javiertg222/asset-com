const db = require("../../database");
const { deleteUploads } = require("../utils/deleteUploads");

const getConfiguration = async (req, res) => {
  const sql = "SELECT * from config";
  db.all(sql, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
};

const createConfiguration = async (req, res, next) => {
  const sql = `INSERT INTO config(title, image) VALUES($title,$image)`;
  let data = {
    $title: req.body.title,
    $image: req.file
      ? `${process.env.URL}:${process.env.PORT}/public/${req.file.filename}`
      : "",
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
};

const updateConfiguration = (req, res) => {
  //recupero el id que viene como parámetro en la ruta
  const id = Number(req.params.id);
  //Consulta sql
  let sql = `UPDATE config SET title=$title WHERE id=${id}`;
  //Datos a modificar en la tabla
  let data = {
    $title: req.body.title,
  };

  //Evaluo si se cambia la imagen o se deja la misma
  if (req.file) {
    sql = `UPDATE config SET title=$title, image=$image WHERE id=${id}`;
    data = {
      $title: req.body.title,
      $image: `${process.env.URL}:${process.env.PORT}/public/${req.file.filename}`,
    };
    //Elimino la imagen del servidor
    deleteUploads(id, "SELECT image FROM config WHERE id = ?");
  }

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
};

module.exports = {
  createConfiguration,
  getConfiguration,
  updateConfiguration,
};
