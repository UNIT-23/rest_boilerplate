"use strict";

import fs from "fs"
import path from 'path'
import Sequelize from 'sequelize'
import { each } from 'lodash'
const basename = path.basename(module.filename)
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const lowerCaseModels = {}
const models = {}
let db = null

if (config.use_env_variable) {
  db = new Sequelize(process.env[config.use_env_variable]);
} else {
  db = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter(function(file) {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(function(file) {
    const model = db["import"](path.join(__dirname, file));
    models[model.name] = model;
    lowerCaseModels[model.name.toLowerCase()] = model
  });

each(models, model => {
  if ('associate' in model) {
    model.associate(models)
  }
})

export  { db }
export  { lowerCaseModels }
export { Sequelize }
export const loading =  db.authenticate()
  .then(() => {
  // eslint-disable-next-line no-console
    console.log('Database connection successfully established.')
  
    return models
  })
  .catch((err) => {
  // eslint-disable-next-line no-console
    console.log(`Error connecting to database`, err)
  })

export default models;
