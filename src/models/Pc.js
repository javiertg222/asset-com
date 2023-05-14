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
    tipo
  ) {
    super(nombre, n_serie, estado, localizacion, image, tipo);
    this.nucleos = nucleos;
    this.ram = ram;

  }
}
module.exports = Pc;
