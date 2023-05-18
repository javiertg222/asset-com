
# DOCUMENTACIÓN DEL PROYECTO :free:

[![](https://skills.thijs.gg/icons?i=js,html,css,nodejs,react)](https://skills.thijs.gg)

### Licencia

![Bower](https://img.shields.io/bower/l/mi)

### Versiones

![node-current](https://img.shields.io/node/v/cu)
![npm](https://img.shields.io/npm/v/npm)
![vscode](https://img.shields.io/badge/vscode-v1.77.1-blue)

### Actualizar nodejs y npm:

Descargar el instalador de la página oficial. https://nodejs.org/es/ 

`npm install npm -g`

`node -v`

`npm -v`

`$ node -v && npm -v`

v18.15.0

9.5.0


### Crear proyecto react:
```
npx create-react-app "mi_app"
```

`npm start`

### Front-end


http://localhost:3000


### Back-end

![express](https://img.shields.io/badge/express-v4.18.2-red)

http://localhost:3001


### Deploy

1. Clonar el proyecto y configurar el archivo .env con las variables. Ver el archivo de ejemplo [.env.example](https://github.com/javiertg222/assetcom/blob/main/.env.example)

2. Cuando se ejecute la aplicación se crearán la BBDD y las tablas, pero será necesario ejecutar los dos comandos INSERT que hay en la carpeta migrations para meter los valores de las etiquetas y crear un usuario admin de inicio con el que poder loguearse (admin@admin.it/admin)

2. En la raiz del proyecto ejecutar:

`npm run app` (levanta el servidor y el cliente simultáneamente)

