const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:[true , "firstname is required"]
    },
    email:{
        type:String,
        required:[true , "email is required"],
        unique:true,
    },       
    password:{
        type:String,
        required:[true , "password is required"]
    },
    
},{timestamps: true});


module.exports = mongoose.model('author',authorSchema)