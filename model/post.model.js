const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    imageCaption : {
        type : String,
        required: true,
    },
    image : {
        type : String,
        required : true,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    likes : {
        type : String,
        default : 0
    }
},{timestamps : true})
const Post = mongoose.model('Post',postSchema);
module.exports = Post;