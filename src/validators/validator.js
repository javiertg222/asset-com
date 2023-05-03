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
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

const validatorAsset = () => {};
module.exports = { validatorUser, validate, validatorAsset };
