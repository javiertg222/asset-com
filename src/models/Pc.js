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
    tipo,
    id_usuario
  ) {
    super(nombre, n_serie, estado, localizacion, image, tipo, id_usuario);
    this.nucleos = nucleos;
    this.ram = ram;

  }
}
module.exports = Pc;
