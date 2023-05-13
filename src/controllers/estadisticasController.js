const db = require("../../database");
/**
 * Función para los datos de las estadísticas
 * @param {*} req
 * @param {*} res
 */
async function getEstadisticas(req, res) {
  const sql_usuarios = `SELECT COUNT(*) FROM usuarios`;
  const sql_assets= `SELECT COUNT(*) FROM activo`; 
  let estadisticas = [];
  db.all(sql,(err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
}

module.exports = { getEstadisticas };
