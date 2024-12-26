const Section = require('./Section');
const User = require('./User')
const Role = require('./Role')
const Topic = require('./Topic')
const UserRole = require('./UserRole')
const TopicSection = require('./TopicSection');
const Comment = require('./Comment');
const CommentTopicUser = require('./CommentTopicUser');

// UserRole
User.belongsToMany(Role, { through: UserRole,  onDelete: 'CASCADE'});
Role.belongsToMany(User, { through: UserRole,  onDelete: 'CASCADE'});

// TopicSections
Topic.belongsToMany(Section, { through: TopicSection, onDelete: 'CASCADE' });
Section.belongsToMany(Topic, { through: TopicSection, onDelete: 'CASCADE' });

// CommentTopicUser
Topic.belongsToMany(Comment, { through: CommentTopicUser, onDelete: 'CASCADE' });
Topic.belongsToMany(User, { through: CommentTopicUser, onDelete: 'CASCADE' });

Comment.belongsToMany(Topic, { through: CommentTopicUser, onDelete: 'CASCADE' });
Comment.belongsToMany(User, { through: CommentTopicUser, onDelete: 'CASCADE' });

User.belongsToMany(Topic, { through: CommentTopicUser, onDelete: 'CASCADE' });
User.belongsToMany(Comment, { through: CommentTopicUser, onDelete: 'CASCADE' });

module.exports = {
  Section,
  User,
  Role,
  Topic,
  UserRole,
  TopicSection,
  Comment,
  CommentTopicUser,
};
