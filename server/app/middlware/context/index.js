module.exports = server => {
  server.use((req, res, next) => {
    req.context = req.context || {};
    next();
  });

  require("./loadModelClass")(server);
  require('./load-model')(server)
  require('./findOptions')(server)

};
