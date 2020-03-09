const mongoose = require ('mongoose')
const Schema = mongoose.Schema


var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

const Post = new Schema ({
    content: { type: String,  },
    time : { type :String, default: today},
})







module.exports = mongoose.model('posts', Post)


