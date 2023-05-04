const { copyFile } = require("fs/promises");

const backupController = async (req, res) => {
  try {
    await copyFile("src/bbdd/db.sqlite3", "src/backups/backup.sqlite3");
    res.json({ok: "El archivo se ha copiado en destino"});
  } catch {
    res.json({notok:"El archivo no puede ser copiado"});
  }
};

module.exports = { backupController };
