const { UserRole, User, Role } = require('../models/model');

class UserRoleController {
    async create(req, res) {
        try {
            const { UserId, RoleId } = req.body;
            const userRole = await UserRole.create({ UserId, RoleId });
            res.status(201).json(userRole);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findAll(req, res) {
        try {
            const userRole = await UserRole.findAll();
            res.status(200).json(userRole);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findById(req, res) {
        try {
            const { id } = req.params;
            const userRole = await UserRole.findOne({
                where: { UserId: id },
                include: [
                    {
                        model: User,
                        as: 'User'
                    },
                    {
                        model: Role,
                        as: 'Role'
                    }
                ]
            })

            if (userRole) {
                res.status(200).json(userRole);
            } else {
                res.status(404).json({ message: 'User_Role not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { RoleId } = req.body;
            const userRole = await UserRole.findOne({ where: { UserId: id } })
            if (userRole) {
                userRole.RoleId = RoleId || userRole.RoleId;
                await userRole.save();
                res.status(200).json(userRole);
            } else {
                res.status(404).json({ message: 'User_Role not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const userRole = await UserRole.findByPk(id);
            if (userRole) {
                await userRole.destroy();
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'User_Role not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new UserRoleController();