//Importamos express
const express = require("express");
const { backupController } = require("../controllers/backupController");
//Creamos el objeto para definir las rutas
const router = express.Router();

/**
 * Backups
 */
router.get("/backups",(req,res, next)=>{backupController(req,res, next)});

module.exports = router;
