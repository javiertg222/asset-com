//Importamos express
const express = require("express");
//Creamos el objeto para definir las rutas
const router = express.Router();
//Importamos los controladores
const controllerAsset = require("../controllers/assetController");
//Middleware para subir imágenes al servidor
const { upload } = require("../middlewares/upload");
//Middleware para verificar token
const {verifyToken} = require("../middlewares/verifyToken")
const {validatorAsset} = require("../validators/validator")

//ASSET ENDPOINTS
/**
 * Crear un activo
 */

router.post("/activo", verifyToken, upload, validatorAsset(), controllerAsset.CREATE_ASSET);
/**
 * Listar todos los activos
 */
router.get("/activos", verifyToken, controllerAsset.GET_ASSETS);
/**
 * Listar un activo por id
 */
router.get("/activo", controllerAsset.GET_ASSET);
/**
 * Modificar un activo
 */
router.put("/activo/:id", verifyToken, upload, validatorAsset(), controllerAsset.UPDATE_ASSET);

router.delete("/activo/:id/:tipo", controllerAsset.DELETE_ASSET);

module.exports = router;
