const Router = require('express');
const router = new Router();
const CommentTopicUserController = require('../controllers/CommentTopicUserController');

router.post('/', CommentTopicUserController.create);
router.get('/', CommentTopicUserController.findAll);
router.get('/:id', CommentTopicUserController.findById);
router.put('/:id', CommentTopicUserController.update);
router.delete('/:id', CommentTopicUserController.delete);

module.exports = router;