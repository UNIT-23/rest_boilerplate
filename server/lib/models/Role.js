
export default function(db, DataTypes) {
  const Role = db.define("Role",{
    id: {
      type         : DataTypes.INTEGER,
      primaryKey   : true,
      autoIncrement: true
    },
    name: {
      type     : DataTypes.STRING,
      allowNull: false
    },
    systemId: {
      type: DataTypes.STRING,
      set(systemId){
        systemId = systemId ? systemId : this.getDataValue('name')
          .split(/\s+/g).map(_.trim).join('_').toUpperCase()
          
        this.setDataValue('systemId', systemId)
      }
    },
    description: DataTypes.STRING
  },{
    freezeTableName: true,
    tableName      : 'Role',
  });

  Role.associate = models => {
    models.Role.belongsToMany(models.Permission, {
      onDelete  : 'CASCADE',
      through   : 'RolePermission',
      foreignKey: { name: 'roleId', allowNull: false }
    }) 
    
    models.Role.hasMany(models.User, {
      foreignKey: { name: 'roleId', allowNull: false },
      onDelete  : 'RESTRICT'
    })
  }
  
  return Role;
};
  