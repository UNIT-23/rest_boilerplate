const { jwt } = require("../../modules");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token);
    res.userData = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "auth failed"
    });
  }
};
