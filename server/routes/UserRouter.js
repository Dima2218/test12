const Router = require('express');
const router = new Router();
const UserController = require('../controllers/UserController');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/', UserController.findAll);
router.get('/:id', UserController.findById);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete);

module.exports = router;