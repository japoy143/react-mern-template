const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  //if token not found
  if (!authHeader) return res.sendStatus(401);

  //bearer[0] token[1]
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
    if (err) return res.sendStatus(403);

    req.user = decode.email; //if email used or name

    next();
  });
};

module.exports = verifyJWT;
