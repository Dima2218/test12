const Router = require('express');
const router = new Router();
const TopicSectionController = require('../controllers/TopicSectionController');

router.post('/', TopicSectionController.create);
router.get('/', TopicSectionController.findAll);
router.get('/:id', TopicSectionController.findById);
router.put('/:id', TopicSectionController.update);
router.delete('/:id', TopicSectionController.delete);

module.exports = router;