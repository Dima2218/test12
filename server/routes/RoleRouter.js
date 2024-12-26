const Router = require('express');
const router = new Router();
const RoleController = require('../controllers/RoleController');

router.post('/', RoleController.create);
router.get('/', RoleController.findAll);
router.get('/:id', RoleController.findById);
router.put('/:id', RoleController.update);
router.delete('/:id', RoleController.delete);

module.exports = router;