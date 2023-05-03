const db = require("../../database");
const {deleteUploads} = require("../utils/deleteUploads")


const getAssets= async (req, res)=> {
  const sql =
    "SELECT id_asset, image, name_asset, serial_number, status, location, fecha FROM asset INNER JOIN status, location ON asset.id_status=status.id_status AND asset.id_location=location.id_location";
  db.all(sql, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
}

const getAsset= async (req, res, id)=> {
  const sql = "SELECT * FROM asset WHERE id_asset = ?";
  const params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(row);
  });
}

const createAsset= async (req, res)=> {
  // console.log(req.body)
  // console.log(req.file)
  const sql = `INSERT INTO asset(image,name_asset,serial_number,id_status,id_location,fecha)
  VALUES($image,$assetname,$serialnumber,(SELECT id_status FROM status WHERE status=$status),(SELECT id_location FROM location WHERE location=$location), datetime('now'))`;
  let data = {
    $assetname: req.body.assetname,
    $serialnumber: req.body.serialnumber,
    $status: req.body.status,
    $location: req.body.location,
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
}

const updateAsset= async (req, res)=> {
  //recupero el id que viene como parámetro en la ruta
  const id = Number(req.params.id);
  //Consulta sql
  let sql = `UPDATE asset SET name_asset=$assetname,serial_number=$serialnumber,
  id_status=(SELECT id_status FROM status WHERE status =$status), id_location=(SELECT id_location FROM location WHERE location =$location),fecha=datetime('now') WHERE id_asset=${id}`;
  //Datos a modificar en la tabla
  let data = {
    $assetname: req.body.assetname,
    $serialnumber: req.body.serialnumber,
    $status: req.body.status,
    $location: req.body.location,
  };

  //Evaluo si se cambia la imagen o se deja la misma
  if (req.file) {
    sql = `UPDATE asset SET image=$image, name_asset=$assetname,serial_number=$serialnumber,
    id_status=(SELECT id_status FROM status WHERE status =$status), id_location=(SELECT id_location FROM location WHERE location =$location),fecha=datetime('now') WHERE id_asset=${id}`;
    data = {
      $image: `${process.env.URL}:${process.env.PORT}/public/${req.file.filename}`,
      $assetname: req.body.assetname,
      $serialnumber: req.body.serialnumber,
      $status: req.body.status,
      $location: req.body.location,
    };
    //Elimino la imagen del servidor
    deleteUploads(id, "SELECT image FROM asset WHERE id_asset = ?");
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
}

const deleteAsset= async (req, res)=> {
  const id = Number(req.params.id);
  let sql = `DELETE FROM asset WHERE id_asset=${id}`;
  const stm = db.prepare(sql, (error) => {
    if (error) {
      throw new Error(error.message);
    }
  });

  stm.run((error) => {
    if (error) {
      res.status(400).json({ error: res.message });
      return;
    }
    res.json({ message: "deleted", data: req.params });
  });
  stm.finalize();
   //Elimino la imagen del servidor
   deleteUploads(id);
}

module.exports = {
  getAssets,
  getAsset,
  createAsset,
  updateAsset,
  deleteAsset,
};
