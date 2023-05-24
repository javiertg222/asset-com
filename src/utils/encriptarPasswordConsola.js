#!/usr/bin/env node
const bcrypt = require('bcryptjs')
console.log('GENERADOR DE PASSWORD ENCRIPTADA')
// obtenemos los argumentos proporcionados al script.
var argumentos = process.argv.slice(2);
// validamos que tenga como minimo 2 parametros.
if (argumentos.length < 1)
{
	console.log("Debe proporcionar un password");
	process.exit();
}


/**
 * Función para encriptar un password.
 * Se accede al directorio utils desde una consola y se ejecuta 'node encriptarPasswordConsola.js "texto-password"'
 * @param {*} textPlain
 * @returns password encriptado
 */
async function encrypt(textPlain){
  return await bcrypt.hash(textPlain, 10);
};

// imprimimos el resultado.
(
    async () => {
        console.log(await encrypt(argumentos[0]))
    }
)()