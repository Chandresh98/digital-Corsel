const validator = require('../middleWare/validator')
const userModel = require('../model/userModel')
const jwt = require('jsonwebtoken')


const user = async function (req, res) {
    try {
        const data = req.body
        const { fullName, email, password } = data
        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, message: "Please enter Deatils" })
        }
        if (!validator.isValid(fullName)) {
            return res.status(400).send({ status: false, massage: "please enter Full-Name" })
        }

        if (!validator.isValid(email)) {
            return res.status(400).send({ status: false, massage: "please enter Email" })
        }
        if (!validator.isValidEmail(email)) {
            return res.status(400).send({ status: false, massage: "please enter correct Email" })
        }
        const DBEmail = await userModel.findOne({ email: email })
        if (DBEmail) {
            return res.status(400).send({ status: false, massage: "Email alrady Exist use different emailId" })
        }

        if (!validator.isValid(password)) {
            return res.status(400).send({ status: false, massage: "please enter Password" })
        }

        const createUser = await userModel.create(data)
        return res.status(201).send({ status: true, message: "User created successfully", data: createUser })
    } catch (err) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const loginUser = async function (req, res) {
  try{  const data = req.body
    if (Object.keys(data).length === 0) {
        return res.status(400).send({ status: false, message: "Please enter Deatils" })
    }

    const { email, password } = data
    if (!validator.isValid(email)) {
        return res.status(400).send({ status: false, massage: "please enter Email" })
    }
    if (!validator.isValidEmail(email)) {
        return res.status(400).send({ status: false, massage: "please enter correct Email" })
    }

    if (!validator.isValid(password)) {
        return res.status(400).send({ status: false, massage: "please enter Password" })
    }

    const findUser = await userModel.findOne({ email: email, password: password })
    if (!findUser) {
        return res.status(404).send({ status: false, message: "No user found" })
    }

    const token = jwt.sign({
        userId: findUser._id,
    }, "DigitalSign"
    );

    res.setHeader('x-api-key',token)
    return res.status(200).send({ status: true, message: "Successful Login"})

}catch(error){
    return res.status(500).send({ status: false, message: error.message })
}
}

module.exports.user = user
module.exports.loginUser=loginUser