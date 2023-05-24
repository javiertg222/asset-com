const { copyFile } = require("fs/promises");
const path =require('path')
const backupController = async (req, res, next) => {
  try {
    await copyFile(
      path.join(__dirname, "../bbdd/assetcom.sqlite3"),
      path.join(__dirname, `../backups/${Date.now()}-backup.sqlite3`)
    );
    res.json({ ok: "El archivo se ha copiado en destino" });
  } catch {
    res.json({ notok: "El archivo no puede ser copiado" });
  }
};

module.exports = {backupController};
