const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Topic = require('./Topic');
const Section = require('./Section');

const TopicSection = sequelize.define('TopicSection', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      TopicId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Topic',
          key: 'id'
        },
        allowNull: false
      },
      SectionId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Section',
          key: 'id'
        },
        allowNull: false
      }
});

TopicSection.belongsTo(Topic, { foreignKey: 'TopicId' });
TopicSection.belongsTo(Section, { foreignKey: 'SectionId' });

module.exports = TopicSection;