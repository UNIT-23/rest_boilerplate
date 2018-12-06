const Path = require("path");

module.exports = {
  tokenIssuer: process.env.MPC_AUTH_JWT_ISSUER || "AusPostMPC",
  dirPath: Path.join(__dirname, "/key/"),
  publicKeyName: Path.join("jwt-secret.pub"),
  privateKeyName: Path.join("jwt-secret")
};
