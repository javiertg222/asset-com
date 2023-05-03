//Importamos express
const express = require("express");
//Creamos el objeto para definir las rutas
const router = express.Router();
//Middleware para subir imágenes al servidor
const { upload } = require("../controllers/uploadController");
//Importamos los controladores
const controllerUser = require("../controllers/userController");
const {validatorUser} = require("../validators/validator")

//USER ENDPOINTS

/**
 * Listar todos los usuarios
 */

router.get("/usuarios", controllerUser.GET_USERS);
/**
 * Listar un usuario por id
 */
router.get("/usuario/:id", controllerUser.GET_USER);

/**
 * Insertar usuarios
 */

router.post("/usuario", validatorUser(), upload, controllerUser.CREATE_USER);

/**
 * Modificar usuarios
 */

router.put("/usuario/:id", validatorUser(), upload, controllerUser.UPDATE_USER);

/**
 * Borrar usuarios
 */
router.delete("/usuario/:id", controllerUser.DELETE_USER);

/**
 * Cambiar la contraseña
 */
router.post("/password", controllerUser.CHANGE_PASSWORD);

module.exports = router;