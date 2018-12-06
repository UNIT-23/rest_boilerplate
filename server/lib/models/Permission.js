
export default function(db, DataTypes) {
  const Permission = db.define("Permission", {
    id: {
      type         : DataTypes.INTEGER,
      primaryKey   : true,
      autoIncrement: true
    },
    action: {
      type     : DataTypes.STRING,
      allowNull: false,
      set(action) {
        this.setDataValue('action', action.toUpperCase());
      }
    },
    model: {
      type     : DataTypes.STRING,
      allowNull: false,
      set(model) {
        this.setDataValue('model', model.toUpperCase());
      }
    },
    description: {
      type     : DataTypes.STRING,
      allowNull: false
    },
    options: {
      type        : DataTypes.JSON,
      defaultValue: {}
    }
  },{
    freezeTableName: true,
    tableName      : 'Permission',
    indexes        : [{
      unique: true,
      fields: ['action', 'model']
    }]
  });

  Permission.associate = models => {
    models.Permission.belongsToMany(models.Role, {
      onDelete  : 'CASCADE',
      through   : 'RolePermission',
      foreignKey: { name: 'permissionId', allowNull: false }
    })   
  }

  return Permission;
};
