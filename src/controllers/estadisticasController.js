const db = require("../../database");
/**
 * Función para los datos de las estadísticas
 * @param {*} req
 * @param {*} res
 */
async function getEstadisticas(req, res) {
  const sql = `SELECT name, cant, (SELECT count(*) FROM asset) as total FROM asset_counter
      UNION
      SELECT name, cant, (SELECT count(*) FROM user) as total FROM user_counter`;
  const params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
}

module.exports = { getEstadisticas };
