const validator = require('../middleWare/validator')
const blogModel = require('../model/blogModel')
const userModel = require('../model/userModel')

const createBlog = async function (req, res) {
    try {
        const data = req.body
        const userId = req.params.userId
        const { title, body, category } = data
        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, message: "Please enter Deatils" })
        }

        if (!validator.isValid(title)) {
            return res.status(400).send({ status: false, massage: "please enter title" })
        }

        if (!validator.isValid(body)) {
            return res.status(400).send({ status: false, massage: "please enter body" })
        }
        if(Object.values(body).length<100){
            return res.status(400).send({ status: false, massage: "please enter body minimum 100 Words" })
        }

        const typeCatagory = ['tecnology','nature','life']
        if(!typeCatagory.includes(category)){
            return res.status(400).send({status:false,message:"please write blog on Tecnology, Nature or Life "})
        }

        if (!validator.isValid(category)) {
            return res.status(400).send({ status: false, massage: "please enter category" })
        }

        if (!validator.isValidObjectId(userId)) {
            return res.status(400).send({ status: false, massage: "please enter correct userId" })
        }
         const authorDetails = await userModel.findById(userId)
         if(!authorDetails){
            return res.status(404).send({status:false,message:"User Not Found"})
         }

        if(req.decodedToken.userId==userId){
            const blogCreate = await blogModel.create(data)
            return res.status(201).send({status:true,message:"successfull",data:blogCreate})
        }else{
            return res.status(403).send({ status: false, message: "authorization denied" })
        }


    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const getBlog = async function(req,res){
try{
    const data = req.query.category
    if(data){
        const getBlog = await blogModel.find({category:data})
        return res.status(200).send({status:true,Blogs:getBlog})
    }

    const getBlog = await blogModel.find()
    return res.status(200).send({status:true,Blog:getBlog})

}catch(error){
    return res.status(500).send({ status: false, message: error.message })
}
}
module.exports.createBlog = createBlog
module.exports.getBlog = getBlog