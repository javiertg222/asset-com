const db = require("../../database");
class Perfil {
  constructor(nombre, apellido, apodo, image) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.apodo = apodo;
    this.image = image;
  }
  actionsPerfil(sql, perfil) {
    const stm = db.prepare(sql, (error) => {
      if (error) {
        throw new Error(error.message);
      }
    });

    stm.run(perfil, (error) => {
      if (error) {
        throw new Error(error.message);
      }
    });
    stm.finalize();
  }
  
}
module.exports = Perfil;
