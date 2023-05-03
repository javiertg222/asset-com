const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database("./src/bbdd/assetcom.sqlite3", (error) => {
  if (error) {
    console.error(error.message);
    throw error;
  } else {
    console.log("Connected to the SQLite database.");
    //Crear la tabla configuración
    db.run(
      `CREATE TABLE IF NOT EXISTS "configuracion" (
          "id"	INTEGER,
          "titulo"	TEXT,
          "imagen"	TEXT,
          PRIMARY KEY("id" AUTOINCREMENT)
        )`
    );

    //Crear la tabla etiqueta
    db.run(
      `CREATE TABLE IF NOT EXISTS "etiqueta" (
          "id"	INTEGER,
          "nombre"	TEXT,
          PRIMARY KEY("id" AUTOINCREMENT)
        )`
    );

    //Crear la tabla usuario
    db.run(
      `CREATE TABLE IF NOT EXISTS "usuarios" (
        "id"	INTEGER,
        "email"	TEXT,
        "password"	TEXT,
        "rol"	TEXT NOT NULL DEFAULT 'user' CHECK("rol" IN ('user', 'admin')),
        "fecha"	TEXT,
        "id_configuracion"	INTEGER,
        FOREIGN KEY("id_configuracion") REFERENCES "configuracion"("id"),
        PRIMARY KEY("id" AUTOINCREMENT)
      )`
    );

    //Crear la tabla de los activos
    db.run(`CREATE TABLE IF NOT EXISTS "activo" (
      "id"	INTEGER,
      "nombre"	TEXT,
      "n_serie"	TEXT,
      "estado"	TEXT DEFAULT 'alta' CHECK("estado" IN ('alta', 'mantenimiento', 'baja')),
      "localizacion"	TEXT DEFAULT 'empresa' CHECK("localizacion" IN ('empresa', 'transito', 'cliente')),
      "imagen"	TEXT,
      "fecha"	TEXT,
      "id_usuario"	INTEGER,
      FOREIGN KEY("id_usuario") REFERENCES "usuarios"("id"),
      PRIMARY KEY("id" AUTOINCREMENT)
    )`);
    
    //Crear la tabla perfil
    db.run(
      `CREATE TABLE IF NOT EXISTS "perfil" (
        "id"	INTEGER,
        "nombre"	TEXT,
        "apellido"	TEXT,
        "apodo"	TEXT,
        "foto"	TEXT,
        "id_usuario"	INTEGER,
        FOREIGN KEY("id_usuario") REFERENCES "usuarios"("id") ON UPDATE CASCADE ON DELETE CASCADE,
        PRIMARY KEY("id" AUTOINCREMENT)
      )`
    );
    //Crear la tabla monitor

    db.run(
      `CREATE TABLE IF NOT EXISTS "monitor" (
        "id"	INTEGER,
        "resolucion"	TEXT,
        "tamaño"	TEXT,
        FOREIGN KEY("id") REFERENCES "activo"("id") ON UPDATE CASCADE ON DELETE CASCADE,
        PRIMARY KEY("id")
      );`
    );
    //Crear la tabla pc
    db.run(`CREATE TABLE IF NOT EXISTS "pc" (
      "id"	INTEGER,
      "nucleos"	TEXT,
      "ram"	TEXT,
      FOREIGN KEY("id") REFERENCES "activo"("id") ON UPDATE CASCADE ON DELETE CASCADE,
      PRIMARY KEY("id")
    )`);
    //Crear la tabla activo-etiqueta
    db.run(`CREATE TABLE IF NOT EXISTS "activo_etiqueta" (
      "id_activo"	INTEGER,
      "id_etiqueta"	INTEGER,
      FOREIGN KEY("id_etiqueta") REFERENCES "etiqueta"("id") ON UPDATE CASCADE ON DELETE CASCADE,
      FOREIGN KEY("id_activo") REFERENCES "activo" ON UPDATE CASCADE ON DELETE CASCADE
    )`);
  }
});

module.exports = db;
