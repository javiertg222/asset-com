const bcrypt = require('bcryptjs')
/**
 * Función para encriptar un password
 * @param {*} textPlain
 * @returns password encriptado
 */
const encrypt = async (textPlain) => {
  const hash = await bcrypt.hash(textPlain, 10);
  return hash;
};
/**
 * Función para comparar un password encriptado y en plano
 * @param {*} passwordPlain 
 * @param {*} hashPassword 
 * @returns boolean true or false
 */
const compare = async (passwordPlain, hashPassword) => {
  return await bcrypt.compare(passwordPlain, hashPassword);
};

module.exports = { encrypt, compare };
