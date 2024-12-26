const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Topic = sequelize.define('Topic', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },    
  isPinned: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isClosed:{
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
});

module.exports = Topic;