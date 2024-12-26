const {Comment} = require('../models/model');

class CommentController {
    async create(req, res) {
        try {
            const { description} = req.body;
            const comment = await Comment.create({description});
            res.status(201).json(comment);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findAll(req, res) {
        try {
            const comment = await Comment.findAll();
            res.status(200).json(comment);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findById(req, res) {
        try {
            const { id } = req.params;
            const comment = await Comment.findByPk(id)

            if (comment) {
                res.status(200).json(comment);
            } else {
                res.status(404).json({ message: 'Comment not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const {description } = req.body;
            const comment = await Comment.findByPk(id);
            if (comment) {
                comment.description = description || comment.description
                await comment.save();
                res.status(200).json(comment);
            } else {
                res.status(404).json({ message: 'Comment not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const comment = await Comment.findByPk(id);
            if (comment) {
                await comment.destroy();
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Comment not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new CommentController();