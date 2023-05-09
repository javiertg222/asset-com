const jwt = require("jsonwebtoken");
const moment = require("moment");
/**
 * Crea un token a raíz del usuario(id, nombre, rol)
 * @param {*} user
 */
const createToken = (user) => {
  const usr = {
    id: user.id,
    nombre: user.nombre,
    rol: user.rol,
  };

  const payload = {
    user: usr,
    iat: moment().unix(),
    exp: moment().add(1, "hours").unix(),
  };
  return jwt.sign(payload, process.env.TOKEN_SECRET);
};

module.exports = { createToken };
