//Importamos express
const express = require("express");
//Creamos el objeto para definir las rutas
const router = express.Router();
//Importamos el modelo que ejecutará las sentencias SQL

//MISCELLANEOUS ENDPOINTS


 
  /**
   * Backups
   */
  router.get("/backup", (req, res, next) => {
    backupController(req, res);
  });
  
  module.exports = router;