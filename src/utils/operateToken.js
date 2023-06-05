/**
 * Módulos necesarios para crear y manipular el token.
 * Moment es un módulo para analizar, validar y manipular fechas y horas en Javascript
 */
const jwt = require("jsonwebtoken");
const moment = require("moment");
/**
 * Crea un token con los datos del usuario(id, nombre, rol)
 * @param {*} user
 */
const createToken = (user) => {
  //Datos del usuario
  const usr = {
    id: user.id,
    nombre: user.nombre,
    rol: user.rol,
  };
  //Payload para el token contiene los datos del usuario, fecha de la creación y fecha de expiración.
  const payload = {
    user: usr,
    iat: moment().unix(),
    exp: moment().add(1, "days").unix(),
  };
  return jwt.sign(payload, process.env.TOKEN_SECRET);
};
/**
 * Método para decodificar un token 
 * @param {codificado} token 
 * @returns token string
 */
const decodeToken = (token)=>{
  return jwt.decode(token)
}

module.exports = { createToken, decodeToken };
