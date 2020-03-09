const mongoose = require ('mongoose')
const Schema = mongoose.Schema
const Post = require('../models/news-model')


const userSchema = new Schema({
    email: String,
    password: String,
    googleId: String,
    quotes: [{ type:Schema.Types.ObjectId, ref: 'posts'}]
});


module.exports = new mongoose.model('User', userSchema)