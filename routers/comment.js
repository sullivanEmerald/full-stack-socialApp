const express =  require('express')
const router = express.Router()
const commentContoller = require('../controllers/comment')

router.post('/createComment/:id', commentContoller.createComment)


module.exports = router