const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const login = require("./app/routes/login.js");
const signUp = require("./app/routes/singUp.js");
const removeUser = require("./app/routes/deleteUser.js");
const updateUser = require('./app/routes/updateUser.js')

const cors = require("cors");
const morgan = require("morgan");
const db = require("./models");
app.disable("x-powered-by");
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

let PORT = process.env.PORT || 8081;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));



app.use("/login", login);
app.use("/signup", signUp);
app.use("/delete", removeUser);
app.use("/update", updateUser);


db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log(`Listening on PORT ${PORT}`);
  });
});
