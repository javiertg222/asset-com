const { copyFile } = require("fs/promises");
const path =require('path')
const backupController = async (req, res, next) => {
  try {
    await copyFile(
      "../bbdd/hola.txt",
      `../backups/${new Date()}-backup.txt`
    );
    res.json({ ok: "El archivo se ha copiado en destino" });
  } catch {
    res.json({ notok: "El archivo no puede ser copiado" });
    console.log(path.join(__dirname, "hola.txt"))
  }
};

module.exports = {backupController};
