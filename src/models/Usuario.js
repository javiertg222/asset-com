const db = require("../../database");
class Usuario {
  constructor(email, password, rol) {
    this.email = email;
    this.password = password;
    this.rol = rol;
  }

  actionsUser(sql, usuario) {
    const stm = db.prepare(sql, (error) => {
      if (error) {
        throw new Error(error.message);
      }
    });

    stm.run(usuario, (error) => {
      if (error) {
        throw new Error(error.message);
      }
    });
    stm.finalize();
  }
 
}

module.exports = Usuario;
