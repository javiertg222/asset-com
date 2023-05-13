const Activo = require("./Activo");

class Pc extends Activo {
  constructor(
    nombre,
    n_serie,
    estado,
    localizacion,
    image,
    nucleos,
    ram,
    activo
  ) {
    super(nombre, n_serie, estado, localizacion, image);
    this.nucleos = nucleos;
    this.ram = ram;
    this.activo = activo;
  }
}
module.exports = Pc;
