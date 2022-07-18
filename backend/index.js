const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bp = require('body-parser')
const router = require('./route')

app.use(bp.json())
app.use(bp.urlencoded({extended:true}))

mongoose.connect("mongodb+srv://arnabbiswas_14:arnabbiswas@cluster0.b95gv.mongodb.net/group-11-Database?retryWrites=true&w=majority" , {
    useNewUrlParser:true
})

.then( () =>console.log(" MONGO DB IS CONNECTED"))
.catch( err => console.log(err))

app.use('/',router)

app.listen(process.env.PORT || 3000, function() {
    console.log(" EXPRESS APP RUNNING ON PORT " +  (process.env.PORT || 3000));
});