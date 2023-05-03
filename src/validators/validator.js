const { body } = require("express-validator");
const validatorUser = () => {
  return [
    body("nombre").blacklist('<>&,/').trim().toLowerCase(),
    body("apellido").blacklist('<>&,/').trim().toLowerCase(),
    body("apodo").blacklist('<>&,/').trim().toLowerCase(),
    body("email").trim().isEmail(),
    body("password").blacklist('<>&,/').trim(),
  ];
};

const validatorAsset = () => {};
module.exports = { validatorUser, validatorAsset };
