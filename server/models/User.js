const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
},
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isBaned: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    }    
});

module.exports = User;