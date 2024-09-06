const path = require("path")
const express = require("express")
const hbs = require("hbs")

const geocode = require("./utils/geocode")
const foreCast = require("./utils/forecast")


const app = express()

//Define path for express config
const publicDirectoryPath = path.join(__dirname,"../public")
const viewDirectoryPath = path.join(__dirname, "../templates/views")
const partialDirectoryPath = path.join(__dirname, "../templates/partials")

//Set up handlebar engine and views locations
app.set("view engine","hbs")
app.set("views", viewDirectoryPath)
hbs.registerPartials(partialDirectoryPath)

//Set up static directory to serve
app.use(express.static(publicDirectoryPath))


app.get("", (req,res)=>{
    res.render("index",{
        title:"Weather App",
        name: "Shashindu Chamika"
    })
})

app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About Me",
        name:"Shashindu Chamika"
    })
})

app.get("/help",(req,res)=>{
    res.render("help",{
        title:"Get Help",
        message: "We are always ready for helping you",
        name:"Shashindu Chamika"
    })
})

app.get("/help/*", (req,res)=>{
    res.render("error",{
        title:"Get Help",
        name:"Shashindu Chamika",
        error_message:"Help article can not find"
    })
})

app.get("/weather",(req,res)=>{

    if(!req.query.address){
        return res.send({
            error: "Please provide an address"
        })
    }
    
    const address = req.query.address
    //console.log(address)

    geocode.getCoordinates(address,(error,{latitude,longitude, location}={})=>{
        if(error){
            return console.log(error)
        }
        console.log(location)
        foreCast.getForeCast(latitude,longitude,(error,foreCastData)=>{
           if(error){
             return console.log(error)
           }
           console.log("Data",foreCastData)
           res.send({
             foreCastData
           })
        })
    })
   
})

app.get("/products", (req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"Please provide a product type"
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get("*", (req,res)=>{
    res.render("error",{
        title:"Get Help",
        name:"Shashindu Chamika",
        error_message:"Page not found"
    })
})

app.listen(3006, ()=>{
    console.log("Server is running on port 3006")
})