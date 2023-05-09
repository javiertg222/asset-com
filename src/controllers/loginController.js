const usuario = require("../DAO/UserDAO");

const LOGIN = (req, res, next) => {
  usuario.login(req, res, next);
};

module.exports = { LOGIN };
