const { MotionConfig } = require("framer-motion")
const mongoose = require("mongoose")


mongoose.connect("mongodb://0.0.0.0:27017/imageUpload")
.then(()=>{
    console.log('mongo connected')
})
.catch((error)=>{
    console.log("Failed to connect mongo: " ,error)
})

const LoginSchema = new mongoose.Schema({
    path:{
        type:String,
        require:true
    }
})

const collection = new mongoose.model("imgs",LoginSchema)

module.exports= collection