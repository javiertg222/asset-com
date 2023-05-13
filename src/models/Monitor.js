const Activo = require("./Activo");
class Monitor extends Activo {
  constructor(
    nombre,
    n_serie,
    estado,
    localizacion,
    image,
    resolucion,
    tamano,
    activo
  ) {
    super(nombre, n_serie, estado, localizacion, image);
    this.resolucion = resolucion;
    this.tamano = tamano;
    this.activo = activo;
  }
}

module.exports = Monitor;
