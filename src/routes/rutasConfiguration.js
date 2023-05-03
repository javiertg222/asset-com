//Importamos express
const express = require("express");
//Creamos el objeto para definir las rutas
const router = express.Router();
//Importamos los controladores
const controllerConfiguration = require("../controllers/configurationController");
//Middleware para subir imágenes al servidor
const { upload } = require("../controllers/uploadController");

//SETTINGS ENDPOINTS
/**
 * Obtener datos configuración
 */
router.get("/configuracion", controllerConfiguration.GET_CONFIGURATION);

/**
 * Añadir Configuración
 */
router.post("/config", upload, controllerConfiguration.CREATE_CONFIGURATION);
/**
 * Modificar la configuración
 */

router.put("/config", upload, controllerConfiguration.UPDATE_CONFIGURATION);

module.exports = router;
