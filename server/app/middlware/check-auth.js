const JWT = require("../../modules/jwt/index");
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = JWT.verify(token);
    res.userData = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "auth failed"
    });
  }
};
