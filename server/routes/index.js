const Router = require('express');
const router = new Router()
const SectionRouter = require('./SectionRouter')
const TopicRouter = require('./TopicRouter')
const RoleRouter = require('./RoleRouter')
const TopicSectionRouter = require('./TopicSectionRouter')
const UserRouter = require('./UserRouter')
const UserRoleRouter = require('./UserRoleRouter')
const CommentRouter = require('./CommentRouter')
const CommentTopicUserRouter = require('./CommentTopicUserRouter')

router.use('/commentTopicUser', CommentTopicUserRouter)
router.use('/comment',CommentRouter)
router.use('/section',SectionRouter)
router.use('/topic', TopicRouter)
router.use('/role', RoleRouter)
router.use('/topicSection', TopicSectionRouter)
router.use('/user', UserRouter)
router.use('/userRole', UserRoleRouter)

module.exports = router