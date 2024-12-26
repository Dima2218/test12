const Router = require('express');
const router = new Router();
const CommentController = require('../controllers/CommentController');

router.post('/', CommentController.create);
router.get('/', CommentController.findAll);
router.get('/:id', CommentController.findById);
router.put('/:id', CommentController.update);
router.delete('/:id', CommentController.delete);

module.exports = router;