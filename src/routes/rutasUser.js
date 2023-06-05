//Importamos express
const express = require("express");
//Creamos el objeto para definir las rutas
const router = express.Router();
//Middleware para subir imágenes al servidor
const { upload } = require("../middlewares/upload");
//Middleware para verificar token
const {verifyToken} = require("../middlewares/verifyToken")
//Importamos los controladores
const controllerUser = require("../controllers/userController");
const {validatorUser} = require("../validators/validator")

//USER ENDPOINTS

/**
 * Listar todos los usuarios
 */

router.get("/usuarios", verifyToken, controllerUser.GET_USERS);
/**
 * Listar un usuario por id
 */
router.get("/usuario", verifyToken, upload, controllerUser.GET_USER);

/**
 * Insertar usuarios
 */

router.post("/usuario", verifyToken, upload, validatorUser(),controllerUser.CREATE_USER);

/**
 * Modificar usuarios
 */

router.put("/usuario/:id", verifyToken, upload, validatorUser(), controllerUser.UPDATE_USER);

/**
 * Borrar usuarios
 */
router.delete("/usuario/:id", controllerUser.DELETE_USER);
/**
 * Modificar perfil
 */

router.put("/perfil", verifyToken, upload, controllerUser.UPDATE_PERFIL);

/**
 * Cambiar la contraseña
 */
router.post("/password", verifyToken, controllerUser.CHANGE_PASSWORD);

module.exports = router;
