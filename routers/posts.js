const express = require('express')
const router = express.Router()
const upload =  require('../middleware/multer')
const postController =  require('../controllers/posts')

router.post('/createPost', upload.single('file'), postController.createPost)
router.get('/:id', postController.findOne)
router.put('/likePost/:id', postController.updateOne)
router.delete('/deletePost/:id', postController.deleteOne)
module.exports = router