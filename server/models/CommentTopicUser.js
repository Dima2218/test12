const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Comment = require('./Comment');
const Topic = require('./Topic');
const User = require('./User');

const CommentTopicUser = sequelize.define('CommentTopicUser', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      CommentId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Comment',
          key: 'id'
        },
        allowNull: false
      },
      TopicId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Topic',
          key: 'id'
        },
        allowNull: false
      },
      UserId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'id'
        },
        allowNull: false
      }
});

CommentTopicUser.belongsTo(Comment, { foreignKey: 'CommentId' });
CommentTopicUser.belongsTo(Topic, { foreignKey: 'TopicId' });
CommentTopicUser.belongsTo(User,{foreignKey: 'UserId'})

module.exports = CommentTopicUser;