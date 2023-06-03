
const usuario = require("../DAO/UserDAO");

const CREATE_USER = (req, res, next) => {
  usuario.createUser(req, res, next);
};
const GET_USER = (req, res, next) => {
  usuario.getUser(req, res, next);
};
const GET_USERS = (req, res, next) => {
  usuario.getUsers(req, res, next);
};
const UPDATE_USER = (req, res, next) => {
  usuario.updateUser(req, res, next);
};
const DELETE_USER = (req, res, next) => {
  usuario.deleteUser(req, res, next);
};
const UPDATE_PERFIL = (req, res, next) => {
  usuario.updatePerfil(req, res, next);
};
const CHANGE_PASSWORD = (req, res, next) => {
  usuario.changePassword(req, res, next);
};

module.exports = {
  GET_USERS,
  GET_USER,
  CREATE_USER,
  UPDATE_USER,
  UPDATE_PERFIL,
  DELETE_USER,
  CHANGE_PASSWORD,
};
