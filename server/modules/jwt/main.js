const config = require("./config/authentication");
const fs = require("fs");
const _ = require("lodash");
const Path = require("path");

module.exports = function() {
  let publicKey = null;
  let privateKey = null;
  try {
    publicKey = fs.readFileSync(
      Path.join(config.dirPath, config.publicKeyName)
    );
    if (_.isEmpty(publicKey)) {
      throw new Error("Public Auth Key is empty, please re-generate");
    }
    privateKey = fs.readFileSync(
      Path.join(config.dirPath, config.privateKeyName)
    );
    if (_.isEmpty(privateKey)) {
      throw new Error("Private Auth Key is empty, please re-generate");
    }
  } catch (err) {
    const message =
      err.message ||
      "Public and Private Auth Key does not exist, Please generate one";
    throw new Error(message);
  }
  return { publicKey, privateKey };
};
