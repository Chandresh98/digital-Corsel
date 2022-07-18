const express = require('express')
const router = express.Router()
const authorController = require('./controller/authorController')
const blogsController =require('./controller/blogController')
const auth = require('./middleWare/authentication')

router.post("/createUser",authorController.user)

router.post("/login" , authorController.loginUser)

router.post("/createBlogs/:userId",auth.auth, blogsController.createBlog)

router.get("/getBlogs", blogsController.getBlog)

module.exports=router;