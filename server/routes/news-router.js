const express = require('express')

const NewsCtrl = require('../controllers/news-ctrl')
const UserCtrl = require('../controllers/user-ctrl')

const router = express.Router()

const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;




router.post('/user/', UserCtrl.createUser)
router.get('/user/:id', UserCtrl.getUserById)


router.post('/user/post', NewsCtrl.createPost)
router.delete('/post/:id', NewsCtrl.deletePost)
router.get('/post/:id', NewsCtrl.getPostById)
router.get('/posts', NewsCtrl.getPosts)

module.exports = router