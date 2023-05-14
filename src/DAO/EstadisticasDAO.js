const db = require("../../database");
/**
 * Función para los datos de las estadísticas
 * @param {*} req
 * @param {*} res
 */
const getEstadisticas = (req, res, next) => {
  const sql_estadisticas = `SELECT (SELECT count(*) FROM usuarios) as usuarios,(SELECT count(*) FROM activo WHERE estado="Alta") as alta,(SELECT count(*) FROM activo WHERE estado="Mantenimiento") as mantenimiento,(SELECT count(*) FROM activo WHERE estado="Baja") as baja,(SELECT count(*) FROM activo WHERE localizacion="Empresa") as empresa,(SELECT count(*) FROM activo WHERE localizacion="Transito") as transito,(SELECT count(*) FROM activo WHERE localizacion="Cliente") as cliente, count(*) as activos FROM activo`;
  db.get(sql_estadisticas, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(row);
  });
};
module.exports = { getEstadisticas };
