const { sequelize } = require('../../models')
const { Acl, SequelizeStore } = require('@aclify/aclify')
const acl = new Acl(new SequelizeStore(sequelize, { prefix: 'acl_' }));

module.exports =  acl