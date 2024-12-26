const {CommentTopicUser, Comment, Topic, User} = require('../models/model');

class CommentTopicUserController {
    async create(req, res) {
        try {
            const {CommentId, TopicId, UserId} = req.body;
            const commentTopicUser = await CommentTopicUser.create({ CommentId, TopicId, UserId });
            res.status(201).json(commentTopicUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findAll(req, res) {
        try {
            const commentTopicUser = await CommentTopicUser.findAll();
            res.status(200).json(commentTopicUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findById(req, res) {
        try {
            const { id } = req.params;
            const commentTopicUser = await CommentTopicUser.findByPk(id, {
                include:[
                    {
                        model: Comment,    
                    },
                    {
                        model:Topic,
                    },
                    {
                        model: User,
                    }
                ]
            })

            if (commentTopicUser) {
                res.status(200).json(commentTopicUser);
            } else {
                res.status(404).json({ message: 'Comment_Topic_User not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const {CommentId, TopicId, UserId } = req.body;
            const commentTopicUser = await CommentTopicUser.findByPk(id);
            if (commentTopicUser) {
                commentTopicUser.CommentId = CommentId || commentTopicUser.CommentId;
                commentTopicUser.TopicId = TopicId || commentTopicUser.TopicId;
                commentTopicUser.UserId = UserId || commentTopicUser.UserId;
                await commentTopicUser.save();
                res.status(200).json(commentTopicUser);
            } else {
                res.status(404).json({ message: 'Comment_Topic_User not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const commentTopicUser = await CommentTopicUser.findByPk(id);
            if (commentTopicUser) {
                await commentTopicUser.destroy();
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Comment_Topic_User not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new  CommentTopicUserController();