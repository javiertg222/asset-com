const jwt = require("jsonwebtoken");

// Middleware to validate token (rutas protegidas)
const verifyToken = async (req, res, next) => {
  const authorization = req.headers["authorization"];
  let token = "";
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.split(" ")[1];
  }
  
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next(); // continuamos
  } catch (error) {
    res.status(400).json({ error: "Token no es válido." });
  }
  if (!authorization) return res.status(401).json({ error: "Acceso denegado." });
};

module.exports = { verifyToken };
