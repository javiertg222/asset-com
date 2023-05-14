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
    tipo
  ) {
    super(nombre, n_serie, estado, localizacion, image, tipo);
    this.resolucion = resolucion;
    this.tamano = tamano;
  
  }
}

module.exports = Monitor;
