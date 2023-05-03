const jwt = require("jsonwebtoken");
const moment = require("moment");
/**
 * Crea un token a raíz del usuario(id, nombre, rol)
 * @param {*} user
 */
const createToken = (user) => {
  const usr = {
    id: user.id_user,
    name: user.name_user,
    rol: user.id_rol,
  };

  const payload = {
    sub: usr,
    iat: moment().unix(),
    exp: moment().add(1, "hours").unix(),
  };
  return jwt.sign(payload, process.env.TOKEN_SECRET);
};

module.exports = { createToken };
