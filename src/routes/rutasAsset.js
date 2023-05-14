//Importamos express
const express = require("express");
//Creamos el objeto para definir las rutas
const router = express.Router();
//Importamos los controladores
const controllerAsset = require("../controllers/assetController");

//Middleware para subir imágenes al servidor
const { upload } = require("../middlewares/upload");

//ASSET ENDPOINTS
/**
 * Crear un activo
 */

router.post("/activo", upload, controllerAsset.CREATE_ASSET);
/**
 * Listar todos los activos
 */
router.get("/activos", controllerAsset.GET_ASSETS);
/**
 * Listar un activo por id
 */
router.get("/activo", controllerAsset.GET_ASSET);
/**
 * Modificar un activo
 */
router.put("/activo/:id", upload, controllerAsset.UPDATE_ASSET);

router.delete("/activo/:id/:tipo", controllerAsset.DELETE_ASSET);

module.exports = router;
