const estadisticas = require("../DAO/EstadisticasDAO");

const GET_ESTADISTICAS = (req, res, next) => {
  estadisticas.getEstadisticas(req, res, next);
};

module.exports = { GET_ESTADISTICAS };
