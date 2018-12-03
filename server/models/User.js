const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const uniqid = require("uniqid");

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define(
    "User",
    {
      id: {
        type         : Sequelize.INTEGER,
        primaryKey   : true,
        autoIncrement: true
      },
      firstname: {
        type     : Sequelize.STRING,
        unique   : false,
        allowNull: false
      },
      lastname: {
        type     : Sequelize.STRING,
        unique   : false,
        allowNull: false
      },
      email: {
        type     : Sequelize.STRING,
        unique   : true,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING
      }
    },
    {
      hooks: {
        /**
         * encrypt the password, so that we have no plain password in the db
         * @param {Sequelize} user
         */
        beforeCreate: user => {
          const salt = bcrypt.genSaltSync(saltRounds);
          user.password = bcrypt.hashSync(user.password, salt);
        }
      }
    }
  );

  return User;
};
