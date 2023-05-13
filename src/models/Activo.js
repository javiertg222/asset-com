const db = require("../../database");
class Activo {
  constructor(nombre, n_serie, estado, localizacion, image) {
    this.nombre = nombre;
    this.n_serie = n_serie;
    this.estado = estado;
    this.localizacion = localizacion;
    this.image = image;
  }
  actionsAsset(sql, asset) {
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

module.exports = Activo;
