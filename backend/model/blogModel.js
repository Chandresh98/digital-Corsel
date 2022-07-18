const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const blogsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true , "title is required"]
    },
    body: {
        type: String,
        required: [true , "body is required"]
    },
    userId: {
        required:[true , "author-id is required"],
        type:ObjectId,
        ref:"author"
    },
    category:{
        type : String,
        required : [true , "category is required"]
    }, 
    isDeleted:{
        type:Boolean,
        default:false
    },  

},{timestamps:true}) 
module.exports = mongoose.model('blogs', blogsSchema);