
/**
 * Método para saber si está repetido el email de un usuario
 * @param {email de un usuario} email
 * @param {todos los usuarios de la bbdd} users
 * @returns boolean
 */

const findEmail = (email, users) => {
  const user = users.find((user) => user.email_user === email);
  if (user) {
    return true;
  }
};

export { findEmail };
