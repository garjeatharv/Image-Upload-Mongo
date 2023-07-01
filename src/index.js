const express = require('express')
const app = express()
const collection = require('./mongo')
const path = require('path')
const hbs = require('hbs')
const multer = require('multer')
const templatePath = path.join(__dirname,"../templates")

app.use(express.static(path.join(__dirname,'./images')))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.set("view engine","hbs")
app.set("views",templatePath)

let ff
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'src/images')
    },
    filename:(req,file,cb)=>{
        ff=file
        cb(null,ff.originalname)
    }
})

const upload = multer({storage:storage})

app.get('/',async (req,res)=>{
    const data = await collection.find()
    arr=data
    res.render('home',{arr:data})
})

let arr =[]

app.post("/",upload.single("image"),async(req,res)=>{
    try{
        if (ff.mimetype.split("/").pop() == "png" ||
            (ff.mimetype).split('/').pop()=='jpg' ||
            (ff.mimetype).split('/').pop()=='jpeg') {
                
                data={
                    path:ff.originalname
                }

                arr.push(data)
                await collection.insertMany([data])
                
        }
        else{
            res.send("invalid file!")
        }
        res.render("home", { arr: arr });
    }
    catch(e){
        console.log(e)
    }
})

app.listen(3000,()=>{
    console.log('port connected')
})