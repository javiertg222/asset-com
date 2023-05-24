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
    tipo, 
    id_usuario
  ) {
    super(nombre, n_serie, estado, localizacion, image, tipo, id_usuario);
    this.resolucion = resolucion;
    this.tamano = tamano;
  
  }
}

module.exports = Monitor;
