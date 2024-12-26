const Router = require('express');
const router = new Router();
const TopicController = require('../controllers/TopicController');

router.post('/', TopicController.create);
router.get('/', TopicController.findAll);
router.get('/:id', TopicController.findById);
router.put('/:id', TopicController.update);
router.delete('/:id', TopicController.delete);

module.exports = router;