const { body, validationResult } = require("express-validator");

const validatorUser = () => {
  return [
    body("nombre").blacklist('<>&,/=').trim().toLowerCase(),
    body("apellido").blacklist('<>&,/=').trim().toLowerCase(),
    body("apodo").blacklist('<>&,/=').trim().toLowerCase(),
    body("email").trim().isEmail(),
    body("password").trim(),
  ];

};
const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
}

const validatorAsset = () => {
  return [
    body("nombre").blacklist('<>&,/=').trim().toLowerCase(),
    body("n_serie").blacklist('<>&,/=').trim(),
  ];
};
module.exports = { validatorUser, validate, validatorAsset };
