//Importamos express
const express = require("express");
//Creamos el objeto para definir las rutas
const router = express.Router();
//Importamos el controlador del login
const controllerLogin = require("../controllers/loginController");
/**
 * LOGIN
 */
router.post("/login", controllerLogin.LOGIN);
module.exports = router;
