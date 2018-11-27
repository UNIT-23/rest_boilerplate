const jwt = require("jsonwebtoken");
const root = require("./main")();
const config = require("./config/authentication");
const ALGORITHM = "RS256";

module.exports.sign = payload =>
  jwt.sign(payload, root.privateKey, {
    algorithm: ALGORITHM,
    issuer: config.tokenIssuer
  });

module.exports.verify = token =>
  jwt.verify(token, root.publicKey, {
    algorithm: ALGORITHM,
    issuer: config.tokenIssuer
  });
