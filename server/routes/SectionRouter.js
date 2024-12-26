const Router = require('express');
const router = new Router();
const SectionController = require('../controllers/SectionController');

router.post('/', SectionController.create);
router.get('/', SectionController.findAll);
router.get('/:id', SectionController.findByParentId);
router.get('/own/:id', SectionController.findById);
router.put('/:id', SectionController.update);
router.delete('/:sectionId', SectionController.deleteSectionRecursively);

module.exports = router;