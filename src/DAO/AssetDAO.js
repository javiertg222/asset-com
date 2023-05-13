const db = require("../../database");
const Pc = require("../models/Pc");
const Monitor = require("../models/Monitor");
const { deleteUploads } = require("../utils/deleteUploads");

const getAssets = async (req, res) => {
  const sql =
    "SELECT id,image, nombre,n_serie, estado, localizacion,resolucion, tamano, nucleos, ram, fecha, id_m, id_p FROM activo INNER JOIN pc, monitor ON activo.id=pc.id_a AND activo.id=monitor.id_a";
  db.all(sql, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
};

const getAsset = async (req, res, id) => {
  const sql = "SELECT * FROM asset WHERE id_asset = ?";
  const params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(row);
  });
};

const createAsset = async (req, res) => {
  try {
    const sql_activo = `INSERT INTO activo(nombre,n_serie,estado,localizacion,image,fecha,id_usuario)
    VALUES($nombre,$n_serie,$estado,$localizacion,$image,datetime('now'), $id_usuario)`;
    //PC
    if (req.body.activo == "Pc") {
      const {
        activo,
        nombre,
        n_serie,
        estado,
        localizacion,
        image,
        etiquetas,
        nucleos,
        ram,
      } = req.body;
      const pc = new Pc(
        nombre,
        n_serie,
        estado,
        localizacion,
        image,
        nucleos,
        ram,
        activo
      );
      let asset = {
        $nombre: pc.nombre,
        $n_serie: pc.n_serie,
        $estado: pc.estado,
        $localizacion: pc.localizacion,
        $image: req.file
          ? `${process.env.URL}:${process.env.PORT}/public/${req.file.filename}`
          : "",
      };

      pc.actionsAsset(sql_activo, asset);

      const sql_pc = `INSERT INTO pc(id_a,nucleos,ram, id_p) VALUES((SELECT id FROM activo WHERE ROWID IN (SELECT max(ROWID) FROM activo)),$nucleos, $ram, $id_p)`;
      let ordenador = {
        $nucleos: pc.nucleos,
        $ram: pc.ram,
        $id_p: pc.activo,
      };
      pc.actionsAsset(sql_pc, ordenador);
      //ETIQUETAS
      if (etiquetas) {
        const sql_etiqueta = `INSERT INTO activo_etiqueta(id_activo, id_etiqueta) VALUES((SELECT id FROM activo WHERE ROWID IN (SELECT max(ROWID) FROM activo)), (SELECT id FROM etiqueta WHERE nombre=$etiqueta))`;
        etiquetas.map((etiqueta) => {
          let etiq = {
            $etiqueta: etiqueta,
          };
          pc.actionsAsset(sql_etiqueta, etiq);
        });
      }

      res.json({ message: "Activo creado con éxito!" });
    }
    //MONITOR
    if (req.body.activo == "Monitor") {
      const {
        activo,
        nombre,
        n_serie,
        estado,
        localizacion,
        image,
        etiquetas,
        resolucion,
        tamano,
      } = req.body;
      const monitor = new Monitor(
        nombre,
        n_serie,
        estado,
        localizacion,
        image,
        resolucion,
        tamano,
        activo
      );
      let asset = {
        $nombre: monitor.nombre,
        $n_serie: monitor.n_serie,
        $estado: monitor.estado,
        $localizacion: monitor.localizacion,
        $image: req.file
          ? `${process.env.URL}:${process.env.PORT}/public/${req.file.filename}`
          : "",
      };

      monitor.actionsAsset(sql_activo, asset);

      const sql_monitor = `INSERT INTO monitor(id_a, resolucion,tamano, id_m) VALUES((SELECT id FROM activo WHERE ROWID IN (SELECT max(ROWID) FROM activo)),$resolucion, $tamano, $id_m)`;
      let mnt = {
        $resolucion: monitor.resolucion,
        $tamano: monitor.tamano,
        $id_m: monitor.activo,
      };
      monitor.actionsAsset(sql_monitor, mnt);
      //ETIQUETAS
      if (etiquetas) {
        const sql_etiqueta = `INSERT INTO activo_etiqueta(id_activo, id_etiqueta) VALUES((SELECT id FROM activo WHERE ROWID IN (SELECT max(ROWID) FROM activo)), (SELECT id FROM etiqueta WHERE nombre=$etiqueta))`;
        etiquetas.map((etiqueta) => {
          let etiq = {
            $etiqueta: etiqueta,
          };
          monitor.actionsAsset(sql_etiqueta, etiq);
        });
      }
      res.json({ message: "Activo creado con éxito!" });
    }
  } catch (error) {
    console.log(error.message);
  }
};
const updateAsset = async (req, res) => {
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
};

const deleteAsset = async (req, res) => {
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
};

module.exports = {
  getAssets,
  getAsset,
  createAsset,
  updateAsset,
  deleteAsset,
};
