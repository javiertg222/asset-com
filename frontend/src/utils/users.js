/**
 * Método para obtener todos los usuarios de la aplicación
 * @param {*} url
 * @param {*} setUser
 */
const getUser = (url, setUser) => {
  //Constante para guardar el Token
  const token = localStorage.getItem("token");
  fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => setUser(data))
    .catch((error) => console.log(error));
};

/**
 * Método para obtener todos los usuarios de la aplicación
 * @param {*} url
 * @param {*} setUsers
 */
const getUsers = (url, setUsers) => {
  //Constante para guardar el Token
  const token = localStorage.getItem("token");
  fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => setUsers(data))
    .catch((error) => console.log(error));
};
/**
 * Método para borrar un usuario
 * @param {id usuario} id
 */
const deleteUser = (id) => {
  fetch(`http://localhost:3001/usuario/${id}`, {
    method: "DELETE",
  }).then((res) => {
      res.json();
    })
    .catch((error) => console.log(error));
};
/**
 * Método para saber si está repetido el email de un usuario
 * @param {email de un usuario} email
 * @param {todos los usuarios de la bbdd} users
 * @returns boolean
 */

const findEmail = async (email, users) => {
  const user = await users.find((user) => user.email_user === email);
  if (user) {
    return true;
  }
};

export { findEmail, getUser, getUsers, deleteUser };
