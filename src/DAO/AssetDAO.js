const db = require("../../database");
const Pc = require("../models/Pc");
const Monitor = require("../models/Monitor");
const { deleteUploads } = require("../utils/deleteUploads");
/**
 * Función para obtener todos los activos de la aplicación
 * @param {*} req
 * @param {*} res
 */
const getAssets = async (req, res) => {
  const sql = `SELECT id, nombre, n_serie, estado, localizacion, image, fecha, resolucion, tamano,null as nucleos, null as ram,tipo FROM activo INNER JOIN monitor ON activo.id = monitor.id_a
  UNION
  SELECT  id, nombre, n_serie, estado, localizacion, image, fecha,null,null,nucleos, ram, tipo FROM activo INNER JOIN pc ON activo.id = pc.id_a
  `;

  db.all(sql, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
};

const getAsset = async (req, res, id) => {
  const sql = "SELECT * FROM activo WHERE id = ?";
  const params = [req.params.id] || id;
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(row);
  });
};
/**
 * Crear un activo
 * @param {*} req
 * @param {*} res
 */
const createAsset = async (req, res) => {
  try {
    //Lo envía el middleware verifyToken
    const user = req.user;
    const id_usuario = Number(user.user.id);
    const sql_activo = `INSERT INTO activo(nombre,n_serie,estado,localizacion,image,fecha,id_usuario, tipo)
    VALUES($nombre,$n_serie,$estado,$localizacion,$image,datetime('now'), $id_usuario, $tipo)`;
    //PC
    if (req.body.tipo == "Pc") {
      const {
        tipo,
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
        tipo
      );

      let asset = {
        $nombre: pc.nombre,
        $n_serie: pc.n_serie,
        $estado: pc.estado,
        $localizacion: pc.localizacion,
        $image: req.file
          ? `${process.env.URL}:${process.env.PORT}/public/${req.file.filename}`
          : "",
        $tipo: pc.tipo,
        $id_usuario: id_usuario,
      };

      pc.actionsAsset(sql_activo, asset);

      const sql_pc = `INSERT INTO pc(id_a,nucleos,ram) VALUES((SELECT id FROM activo WHERE ROWID IN (SELECT max(ROWID) FROM activo)),$nucleos, $ram)`;
      let ordenador = {
        $nucleos: pc.nucleos,
        $ram: pc.ram,
      };
      pc.actionsAsset(sql_pc, ordenador);
      //ETIQUETAS

      if (etiquetas) {
        const sql_etiqueta = `INSERT INTO activo_etiqueta(id_activo, id_etiqueta) VALUES((SELECT id FROM activo WHERE ROWID IN (SELECT max(ROWID) FROM activo)), (SELECT id FROM etiqueta WHERE nombre=$etiqueta))`;

        if (typeof etiquetas === "string") {
          let etiq = {
            $etiqueta: etiquetas,
          };
          pc.actionsAsset(sql_etiqueta, etiq);
        } else {
          etiquetas.map((etiqueta) => {
            let etiq = {
              $etiqueta: etiqueta,
            };
            pc.actionsAsset(sql_etiqueta, etiq);
          });
        }
      }
      
    }
    //MONITOR
    if (req.body.tipo == "Monitor") {
      const {
        tipo,
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
        tipo
      );
      let asset = {
        $nombre: monitor.nombre,
        $n_serie: monitor.n_serie,
        $estado: monitor.estado,
        $localizacion: monitor.localizacion,
        $image: req.file
          ? `${process.env.URL}:${process.env.PORT}/public/${req.file.filename}`
          : "",
        $tipo: monitor.tipo,
        $id_usuario: id_usuario,
      };

      monitor.actionsAsset(sql_activo, asset);

      const sql_monitor = `INSERT INTO monitor(id_a, resolucion,tamano) VALUES((SELECT id FROM activo WHERE ROWID IN (SELECT max(ROWID) FROM activo)),$resolucion, $tamano)`;
      let mnt = {
        $resolucion: monitor.resolucion,
        $tamano: monitor.tamano,
      };
      monitor.actionsAsset(sql_monitor, mnt);
      
      //ETIQUETAS
      if (etiquetas) {
        const sql_etiqueta = `INSERT INTO activo_etiqueta(id_activo, id_etiqueta) VALUES((SELECT id FROM activo WHERE ROWID IN (SELECT max(ROWID) FROM activo)), (SELECT id FROM etiqueta WHERE nombre=$etiqueta))`;
        if (typeof etiquetas === "string") {
          let etiq = {
            $etiqueta: etiquetas,
          };
          monitor.actionsAsset(sql_etiqueta, etiq);
        } else {
          etiquetas.map((etiqueta) => {
            let etiq = {
              $etiqueta: etiqueta,
            };
            monitor.actionsAsset(sql_etiqueta, etiq);
          });
        }
        
      }
     
    }
  } catch (error) {
    console.log(error.message);
  }
  res.json({ message: "Activo creado con éxito!" });
};
/**
 * Actualizar activos
 * @param {*} req
 * @param {*} res
 */
const updateAsset = async (req, res, next) => {
  try {
    //Lo envía el middleware verifyToken
    const user = req.user;
    const id_usuario = Number(user.user.id);
    const id = Number(req.params.id);

    let sql_activo = `UPDATE activo SET nombre=$nombre, n_serie=$n_serie, estado=$estado, localizacion=$localizacion, fecha=datetime('now'), id_usuario=$id_usuario, tipo=$tipo WHERE id=${id}`;
    //PC
    if (req.body.tipo == "Pc") {
      const {
        tipo,
        nombre,
        n_serie,
        estado,
        localizacion,
        image,
        nucleos,
        ram,
        etiquetas,
      } = req.body;
      const pc = new Pc(
        nombre,
        n_serie,
        estado,
        localizacion,
        "",
        nucleos,
        ram,
        tipo,
        id_usuario
      );
      let asset = {
        $nombre: pc.nombre,
        $n_serie: pc.n_serie,
        $estado: pc.estado,
        $localizacion: pc.localizacion,
        $tipo: pc.tipo,
        $id_usuario: pc.id_usuario,
      };

      pc.actionsAsset(sql_activo, asset);

      const sql_pc = `UPDATE pc SET nucleos=$nucleos, ram=$ram WHERE id_a = ${id}`;
      let ordenador = {
        $nucleos: pc.nucleos,
        $ram: pc.ram,
      };
      pc.actionsAsset(sql_pc, ordenador);

      //Evaluo si se cambia la imagen o se deja la misma
      if (req.file) {
        sql_activo = `UPDATE activo SET nombre=$nombre, n_serie=$n_serie ,estado=$estado ,localizacion=$localizacion, image=$image, fecha=datetime('now'), id_usuario=$id_usuario, tipo=$tipo WHERE id=${id}`;
        asset = {
          $nombre: pc.nombre,
          $n_serie: pc.n_serie,
          $estado: pc.estado,
          $localizacion: pc.localizacion,
          $image: `${process.env.URL}:${process.env.PORT}/public/${req.file.filename}`,
          $tipo: pc.tipo,
          $id_usuario: pc.id_usuario,
        };

        //Añado el activo modificado
        pc.actionsAsset(sql_activo, asset);

        //Elimino la imagen del servidor
        deleteUploads(id, "SELECT image FROM activo WHERE id = ?");
      }
      res.json({ message: "Activo modificado con éxito!" });
    }
    //MONITOR
    if (req.body.tipo == "Monitor") {
      const {
        tipo,
        nombre,
        n_serie,
        estado,
        localizacion,
        image,
        resolucion,
        tamano,
        etiquetas,
      } = req.body;
      const monitor = new Monitor(
        nombre,
        n_serie,
        estado,
        localizacion,
        "",
        resolucion,
        tamano,
        tipo,
        id_usuario
      );
      let asset = {
        $nombre: monitor.nombre,
        $n_serie: monitor.n_serie,
        $estado: monitor.estado,
        $localizacion: monitor.localizacion,
        $tipo: monitor.tipo,
        $id_usuario: monitor.id_usuario,
      };

      monitor.actionsAsset(sql_activo, asset);

      const sql_monitor = `UPDATE monitor SET resolucion=$resolucion, tamano=$tamano WHERE id_a = ${id}`;
      let mnt = {
        $resolucion: monitor.resolucion,
        $tamano: monitor.tamano,
      };
      monitor.actionsAsset(sql_monitor, mnt);
      //Evaluo si se cambia la imagen o se deja la misma
      if (req.file) {
        sql_activo = `UPDATE activo SET nombre=$nombre, n_serie=$n_serie, estado=$estado, localizacion=$localizacion, image=$image, fecha=datetime('now'), id_usuario=$id_usuario, tipo=$tipo WHERE id=${id}`;
        asset = {
          $nombre: monitor.nombre,
          $n_serie: monitor.n_serie,
          $estado: monitor.estado,
          $localizacion: monitor.localizacion,
          $image: `${process.env.URL}:${process.env.PORT}/public/${req.file.filename}`,
          $tipo: monitor.tipo,
          $id_usuario: monitor.id_usuario,
        };

        //Añado el activo modificado
        monitor.actionsAsset(sql_activo, asset);
        monitor.actionsAsset(sql_monitor, mnt);
        //Elimino la imagen del servidor
        deleteUploads(id, "SELECT image FROM activo WHERE id = ?");
      }
      res.json({ message: "Activo modificado con éxito!" });
    }
  } catch (error) {
    console.log(error.message);
  }
};
/**
 * Borrar activos de la aplicación
 * @param {*} req
 * @param {*} res
 */
const deleteAsset = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const tipo = req.params.tipo;
    //Borra el activo
    let sql_activo = `DELETE FROM activo WHERE id=${id}`;
    //Borra la tabla de especialización
    let sql_especializacion = ``;
    //Borra la tabla activo_etiqueta
    let sql_etiquetas = `DELETE FROM activo_etiqueta WHERE id_activo=${id}`;

    if (tipo === "Pc") {
      sql_especializacion = `DELETE FROM pc WHERE id_a=${id}`;
    }
    if (tipo === "Monitor") {
      sql_especializacion = `DELETE FROM monitor WHERE id_a=${id}`;
    }
    const sqls = [sql_activo, sql_especializacion, sql_etiquetas];
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
    deleteUploads(id, "SELECT image FROM activo WHERE id = ?");
    await res.json({ message: "Activo borrado con éxito!", data: req.params });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getAssets,
  getAsset,
  createAsset,
  updateAsset,
  deleteAsset,
};
