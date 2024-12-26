const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');
const Role = require('./Role');

const UserRole = sequelize.define('UserRole', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    UserId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id'
    },
    allowNull: false
  },
  RoleId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Roles',
      key: 'id'
    },
    allowNull: false
  }
});


UserRole.belongsTo(User, { foreignKey: 'UserId' });
UserRole.belongsTo(Role, { foreignKey: 'RoleId' });

module.exports = UserRole;