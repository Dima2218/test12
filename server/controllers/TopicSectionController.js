const {TopicSection, Topic, Section} = require('../models/model');

class TopicSectionController {
    async create(req, res) {
        try {
            const {TopicId, SectionId} = req.body;
            const topicSection = await TopicSection.create({ TopicId, SectionId });
            res.status(201).json(topicSection);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findAll(req, res) {
        try {
            const topicSection = await TopicSection.findAll();
            res.status(200).json(topicSection);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findById(req, res) {
        try {
            const { id } = req.params;
            const topicSection = await TopicSection.findByPk(id, {
                include:[
                    {
                        model: Topic,    
                    },
                    {
                        model:Section,
                    }
                ]
            })

            if (topicSection) {
                res.status(200).json(topicSection);
            } else {
                res.status(404).json({ message: 'Topic_Section not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const {TopicId, SectionId } = req.body;
            const topicSection = await TopicSection.findByPk(id);
            if (topicSection) {
                topicSection.TopicId = TopicId || topicSection.TopicId;
                topicSection.SectionId = SectionId || topicSection.SectionId;
                await topicSection.save();
                res.status(200).json(topicSection);
            } else {
                res.status(404).json({ message: 'Topic_Section not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const topicSection = await TopicSection.findByPk(id);
            if (topicSection) {
                await topicSection.destroy();
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Topic_Section not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new  TopicSectionController();