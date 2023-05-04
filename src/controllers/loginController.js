const { validationResult } = require("express-validator");
const db = require("../../database");
const { findEmail } = require("../utils/findEmail");
const bcrypt = require("../utils/bcrypt");
const { createToken } = require("../utils/createToken");
/**
 * Este controlador es el encargado de logear a un usuario
 * @param {*} req
 * @param {*} res
 */
const loginController = async (req, res) => {
  try {
    const userBody = {
      email: req.body.email,
      password: req.body.password,
    };
    const errors = await validationResult(req); // Encuentra los errores de validación en esta solicitud y los envuelve en un objeto

    if (!errors.isEmpty())
      return res
        .status(422)
        .json({ errors: errors.array(), error: "Email o password inválidos" });

    //Recupero todos los datos de los usuarios para comprobar que el email y password existen.
    db.all("SELECT * FROM usuarios", async (err, users) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      const user = await findEmail(userBody.email, users);
      if (!user) {
        return res.status(400).json({ error: "Usuario no encontrado" });
      }
      const validPassword = await bcrypt.compare(
        userBody.password,
        user.password_user
      );
      if (!validPassword) {
        return res.status(400).json({ error: "Contraseña incorrecta" });
      }

      //Crear token
      const token = createToken(user);

      res.header("auth-token", token).json({
        error: null,
        token: token,
      });
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { loginController };
