//Importamos express
const express = require("express");
//Creamos el objeto para definir las rutas
const router = express.Router();
//Importamos los controladores
const controllerEstadisticas = require("../controllers/estadisticasController");
 /**
   * Estadísticas
   */
 router.get("/estadisticas", controllerEstadisticas.GET_ESTADISTICAS);

  module.exports = router;