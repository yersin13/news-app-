const express = require('express')

const NewsCtrl = require('../controllers/news-ctrl')

const router = express.Router()

router.post('/post', NewsCtrl.createPost)
router.delete('/post/:id', NewsCtrl.deletePost)
router.get('/post/:id', NewsCtrl.getPostById)
router.get('/posts', NewsCtrl.getPosts)

module.exports = router