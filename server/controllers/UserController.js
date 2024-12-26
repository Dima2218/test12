const bcrypt = require('bcrypt');
const { User } = require('../models/model');

class UserController {
    async register(req, res) {
        try {
            const { name, password } = req.body;

            const existingUser = await User.findOne({ where: { name } });
            if (existingUser) {
                return res.status(400).json({ message: 'Username already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                name,
                password: hashedPassword
            });

            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async login(req, res) {
        try {
            const { name, password } = req.body;

            const user = await User.findOne({ where: { name } });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Invalid password' });
            }

            res.status(200).json({user});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findAll(req, res) {
        try {
            const users = await User.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findById(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

      async update(req, res) {
        try {
            const { id } = req.params;
            const { name, password, isBaned } = req.body;
            const user = await User.findByPk(id);

            if (user) {
                user.name = name|| user.name;           
                if (password) {
                    user.password = await bcrypt.hash(password, 10);
                }
                if (isBaned !== undefined) user.isBaned = isBaned
                
                await user.save();
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

        async delete(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            if (user) {
                await user.destroy();
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new UserController();