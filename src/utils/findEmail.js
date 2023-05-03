
/**
 * Función para saber si el password existe en la bbdd
 * @param {*} email
 * @param {*} users 
 * @returns boolean 
 */
const findEmail = (email, users)=>{
    return users.find((user) => email === user.email_user);
}

module.exports = {findEmail}