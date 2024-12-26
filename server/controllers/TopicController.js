const {Topic} = require('../models/model');

class TopicController {
    async create(req, res) {
        try {
            const { name, description, isPinned, isClosed } = req.body;
            const topic = await Topic.create({ name, description, isPinned: isPinned || false, isClosed : isClosed || false });
            res.status(201).json(topic);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findAll(req, res) {
        try {
            const topic = await Topic.findAll();
            res.status(200).json(topic);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findById(req, res) {
        try {
            const { id } = req.params;
            const topic = await Topic.findByPk(id)

            if (topic) {
                res.status(200).json(topic);
            } else {
                res.status(404).json({ message: 'Topic not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { name, description, isClosed, isPinned } = req.body;
            const topic = await Topic.findByPk(id);
            if (topic) {
                topic.name = name || topic.name;
                topic.description = description || topic.description;
                topic.isClosed = isClosed || topic.isClosed;
                topic.isPinned = isPinned || topic.isPinned;
                await topic.save();
                res.status(200).json(topic);
            } else {
                res.status(404).json({ message: 'Topic not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const topic = await Topic.findByPk(id);
            if (topic) {
                await topic.destroy();
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Topic not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new TopicController();