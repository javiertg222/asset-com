const db = require("../../database");
class Configuracion {
  constructor(titulo, imagen) {
    this.titulo = titulo;
    this.imagen = imagen;
  }

  getConfiguracion(sql, res){
    db.all(sql, (err, rows) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json(rows);
    });
  }

  actionsConfiguracion(sql, asset) {
    const stm = db.prepare(sql, (error) => {
      if (error) {
        throw new Error(error.message);
      }
    });

    stm.run(asset, (error) => {
      if (error) {
        throw new Error(error.message);
      }
    });
    stm.finalize();
  }
}

module.exports = Configuracion
