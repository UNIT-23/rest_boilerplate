const bcrypt = require("bcrypt");
const saltRounds = 10;

export default function(sequelize, DataTypes) {
  const User = sequelize.define("User",{
    id: {
      type         : DataTypes.INTEGER,
      primaryKey   : true,
      autoIncrement: true
    },
    firstname: {
      type     : DataTypes.STRING,
      unique   : false,
      allowNull: false
    },
    lastname: {
      type     : DataTypes.STRING,
      unique   : false,
      allowNull: false
    },
    email: {
      type     : DataTypes.STRING,
      unique   : true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING
    }
  },
  {
    freezeTableName: true,
    tableName      : 'User',
    hooks          : {
      /**
         * encrypt the password, so that we have no plain password in the db
         * @param {Sequelize} user
         */
      beforeCreate: user => {
        const salt = bcrypt.genSaltSync(saltRounds);
        user.password = bcrypt.hashSync(user.password, salt);
      }
    }
  });

  User.associate = models => {
    models.User.belongsTo(models.Role, {
      foreignKey: { name: 'roleId', allowNull: false },
      onDelete  : 'RESTRICT'
    })
  }

  return User;
};
