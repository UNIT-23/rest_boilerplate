module.exports = server => {
  console.log("hy context app", server);
  require("./context")(server);
};
