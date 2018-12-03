module.exports = server => {
  server.use((req, res, next) => {
    req.context = req.context || {};
    console.log("hy the context is", req.context);
    next();
  });

  require("./loadModelClass")(server);
  require('./load-model')(server)

};
