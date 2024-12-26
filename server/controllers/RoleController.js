const {Role} = require('../models/model');

class RoleController {
    async create(req, res) {
        try {
            const { name } = req.body;
            const role = await Role.create({ name });
            res.status(201).json(role);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findAll(req, res) {
        try {
            const role = await Role.findAll();
            res.status(200).json(role);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findById(req, res) {
        try {
            const { id } = req.params;
            const role = await Role.findByPk(id)

            if (role) {
                res.status(200).json(role);
            } else {
                res.status(404).json({ message: 'Role not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const role = await Role.findByPk(id);
            if (role) {
                role.name = name || role.name;
                await role.save();
                res.status(200).json(role);
            } else {
                res.status(404).json({ message: 'Role not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const role = await Role.findByPk(id);
            if (role) {
                await role.destroy();
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Role not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}

module.exports = new RoleController();