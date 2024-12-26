const Router = require('express');
const router = new Router();
const UserRoleController = require('../controllers/UserRoleController');

router.post('/', UserRoleController.create);
router.get('/', UserRoleController.findAll);
router.get('/:id', UserRoleController.findById);
router.put('/:id', UserRoleController.update);
router.delete('/:id', UserRoleController.delete);

module.exports = router;