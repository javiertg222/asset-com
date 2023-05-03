const configuration = require("../DAO/ConfigurationDAO");

const CREATE_CONFIGURATION = (req, res, next) => {
  configuration.createConfiguration(req, res, next);
};
const GET_CONFIGURATION = (req, res, next) => {
  configuration.getConfiguration(req, res, next);
};
const UPDATE_CONFIGURATION = (req, res, next) => {
  configuration.updateConfiguration(req, res, next);
};

module.exports = {
  GET_CONFIGURATION,
  CREATE_CONFIGURATION,
  UPDATE_CONFIGURATION,
};
