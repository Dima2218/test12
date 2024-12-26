const { Section } = require('../models/model');

class SectionController {
    async create(req, res) {
        try {
            const { name, description, parentId, isPinned, isAdmin } = req.body;
            const section = await Section.create({ name, description, parentId: parentId || 0, isPinned: isPinned || false, isAdmin: isAdmin || false });
            res.status(201).json(section);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findAll(req, res) {
        try {
            const section = await Section.findAll();
            res.status(200).json(section);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findByParentId(req, res) {
        try {
            const { id } = req.params;
            const section = await Section.findAll({
                where: { parentId: id }
            });

            if (section) {
                res.status(200).json(section);
            } else {
                res.status(404).json({ message: 'Section not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findById(req, res) {
        try {
            const { id } = req.params;
            const section = await Section.findByPk(id)

            if (section) {
                res.status(200).json(section);
            } else {
                res.status(404).json({ message: 'Section not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { name, description, parentId, isPinned, isAdmin } = req.body;

            const section = await Section.findByPk(id);
            if (section) {
                if (name !== undefined) section.name = name;
                if (description !== undefined) section.description = description;
                if (parentId !== undefined) section.parentId = parentId;
                if (isPinned !== undefined) section.isPinned = isPinned;
                if (isAdmin !== undefined) section.isAdmin = isAdmin;
                
                await section.save();
                res.status(200).json(section);
            } else {
                res.status(404).json({ message: 'Section not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    async deleteSectionRecursively(req, res) {
        try {
          const { sectionId } = req.params;
          
          const queue = [sectionId];
          
          while (queue.length > 0) {
            const currentId = queue.shift();
            
            const childSections = await Section.findAll({
              where: { parentId: currentId },
            });
      
            queue.push(...childSections.map((child) => child.id));
          
            await Section.destroy({
              where: { id: [currentId, ...childSections.map((child) => child.id)] },
            });
          }
          
          console.log(`Section with id ${sectionId} and its children deleted successfully.`);
          res.status(200).send('Sections deleted successfully');
          
        } catch (error) {
          console.error(`Error deleting section with id ${sectionId}:`, error);
          res.status(500).send('Error deleting section');
        }
      }
      
}

module.exports = new SectionController();