BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "configuracion" (
	"id"	INTEGER,
	"titulo"	TEXT,
	"imagen"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "activo_etiqueta" (
	"id_activo"	INTEGER,
	"id_etiqueta"	INTEGER,
	FOREIGN KEY("id_activo") REFERENCES "activo" ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY("id_etiqueta") REFERENCES "etiqueta"("id") ON UPDATE CASCADE ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "etiqueta" (
	"id"	INTEGER,
	"nombre"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "usuarios" (
	"id"	INTEGER,
	"email"	TEXT,
	"password"	TEXT,
	"rol"	TEXT DEFAULT 'user' CHECK("rol" IN ('user', 'admin')),
	"fecha"	TEXT,
	"id_configuracion"	INTEGER,
	FOREIGN KEY("id_configuracion") REFERENCES "configuracion"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "perfil" (
	"id"	INTEGER,
	"nombre"	TEXT,
	"apellido"	TEXT,
	"apodo"	TEXT,
	"image"	TEXT,
	"id_usuario"	INTEGER,
	FOREIGN KEY("id_usuario") REFERENCES "usuarios"("id") ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "pc" (
	"id_a"	INTEGER,
	"nucleos"	TEXT,
	"ram"	TEXT,
	FOREIGN KEY("id_a") REFERENCES "activo"("id") ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY("id_a")
);
CREATE TABLE IF NOT EXISTS "monitor" (
	"id_a"	INTEGER,
	"resolucion"	TEXT,
	"tamano"	TEXT,
	FOREIGN KEY("id_a") REFERENCES "activo"("id") ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY("id_a")
);
CREATE TABLE IF NOT EXISTS "activo" (
	"id"	INTEGER,
	"nombre"	TEXT,
	"n_serie"	TEXT,
	"estado"	TEXT DEFAULT 'Alta' CHECK("estado" IN ('Alta', 'Mantenimiento', 'Baja')),
	"localizacion"	TEXT DEFAULT 'Empresa' CHECK("localizacion" IN ('Empresa', 'Transito', 'Cliente')),
	"image"	TEXT,
	"fecha"	TEXT,
	"id_usuario"	INTEGER,
	"tipo"	TEXT CHECK("tipo" IN ('Pc', 'Monitor')),
	FOREIGN KEY("id_usuario") REFERENCES "usuarios"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
INSERT INTO etiqueta('nombre') VALUES ('Informatica'), ('Hardware'),('Perifericos'),('Tecnologia'),('Comunicacion'),('Software')
INSERT INTO usuarios(email,password,rol,fecha) VALUES('admin@admin.it','$2a$10$1WjvHshzeeH/rD1kqmGhHeuBQmi4utVWxv31F9Mstb7ElGBTPwzHq','admin',datetime('now'))
INSERT INTO perfil(nombre, apellido, apodo, image, id_usuario) VALUES('admin', 'admin', 'admin','',(SELECT id FROM usuarios WHERE ROWID IN (SELECT max(ROWID) FROM usuarios)))
COMMIT;
