//Importamos express
const express = require("express");
//Creamos el objeto para definir las rutas
const router = express.Router();
//Importamos el modelo que ejecutará las sentencias SQL

const { body } = require("express-validator");
/**
 * LOGIN
 */
router.post(
    "/login",
    body("email").trim().isEmail(),
    body("password").trim(),
    (req, res, next) => {
      loginController(req, res, next);
    }
  );
  module.exports = router;