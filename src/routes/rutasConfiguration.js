//Importamos express
const express = require("express");
//Creamos el objeto para definir las rutas
const router = express.Router();
//Importamos los controladores
const controllerConfiguration = require("../controllers/configurationController");
//Middleware para subir imágenes al servidor
const { upload } = require("../middlewares/upload");

//SETTINGS ENDPOINTS
/**
 * Obtener datos configuración
 */
router.get("/configuracion", controllerConfiguration.GET_CONFIGURATION);

/**
 * Añadir Configuración
 */
router.post("/configuracion", upload, controllerConfiguration.CREATE_CONFIGURATION);
/**
 * Modificar la configuración
 */

router.put("/configuracion/:id", upload, controllerConfiguration.UPDATE_CONFIGURATION);

module.exports = router;
