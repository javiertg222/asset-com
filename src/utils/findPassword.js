const bcrypt = require("../utils/bcrypt");
/**
 * Función para saber si el password existe en la bbdd
 * @param {*} password
 * @param {*} users
 * @returns boolean
 */
const findPassword = (password, users) => {
  return users.find((user) => bcrypt.encrypt(password) === user.password_user);
};

module.exports = { findPassword };
