const jwt = require("jsonwebtoken");
const root = require("./main")();
const config = require("./config/authentication");
const ALGORITHM = "RS256";

export const  sign = payload =>
  jwt.sign(payload, root.privateKey, {
    algorithm: ALGORITHM,
    issuer   : config.tokenIssuer
  });

export const verify = token =>
  jwt.verify(token, root.publicKey, {
    algorithm: ALGORITHM,
    issuer   : config.tokenIssuer
  });
