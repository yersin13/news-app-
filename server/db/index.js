const mongoose = require ('mongoose')
require('../models/news-model').schema
require('../models/user-model').schema


mongoose
    .connect('mongodb://127.0.0.1:27017/news', { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db