//Servidor
const express = require("express");
const router = express.Router();
//Módulo para evitar Access-Control-Allow-Origin
const cors = require("cors");
//Módulo para las variables de entorno
require("dotenv").config();
const usuarios = require("./src/routes/rutasUser");
const activos = require("./src/routes/rutasAsset");
const configuracion = require("./src/routes/rutasConfiguration");
const login = require("./src/routes/rutasLogin");
const estadisticas = require("./src/routes/rutasEstadisticas");
const backups = require("./src/routes/rutasBackups");
//const auth = require("./middlewares/auth");
//Variable de entorno (puerto de escucha del servidor)
const PORT = process.env.PORT;
//Servidor express
const app = express();
app.use(express.json());
//Previene la inyección de código malicioso
app.use(cors());
//Mapear las rutas de las imágenes subidas a express
app.use("/public", express.static(`${__dirname}/src/uploads`));

//RUTA DE PRUEBA DEL SERVIDOR
router.get("/", (req, res) =>(
  res.status(200).json({ mensaje: "Ruta de prueba de la app" }))
);

//Usamos las rutas creadas
app.use(router);
app.use(usuarios);
app.use(activos);
app.use(configuracion);
app.use(login);
app.use(estadisticas)
app.use(backups);

/**
 * INICIAR EL SERVIDOR
 */

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
