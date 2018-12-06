
export default function(sequelize, DataTypes) {
  const RolePermission = sequelize.define("RolePermission", {} ,{
    freezeTableName: true,
    tableName      : 'RolePermission',
  });

  RolePermission.associate = models =>{
    models.RolePermission.belongsTo(models.Role,{
      onDelete  : 'CASCADE',
      foreignKey: { name: 'roleId', allowNull: false }
    })

    models.RolePermission.belongsTo(models.Permission,{
      onDelete  : 'CASCADE',
      foreignKey: { name: 'permissionId', allowNull: false }
    })
  }
  
  return RolePermission;
};
  