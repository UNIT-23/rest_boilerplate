
import express from 'express'
const app = express()
import bodyParser from "body-parser"
import login from "./app/routes/login.js"
import signUp from "./app/routes/singUp.js"
import bluePrint from './app/routes/blue-print'
import cors from "cors"
import morgan from "morgan"
import { acl } from './modules'
import { db } from "./models"

app.disable("x-powered-by");
app.set('acl', acl)
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const PORT = process.env.PORT || 8081;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

require("./app/middlware").default(app);


app.get("/", (req, res, next) => {
  res.send("Welcome to rest boilerplate ");
});

app.use("/login", login);
app.use("/signup", signUp);
app.use('/api',bluePrint)

app.use((req, res, next) => {
  if (res.responseData) {
    res.json(res.responseData)
  }
  next()
})

db.sync().then(function() {
  app.listen(PORT, function() {
    // eslint-disable-next-line no-console
    console.log(`Listening on PORT ${PORT}`);
  });
});

export default app;