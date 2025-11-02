const express = require("express")
const cors = require("cors")
const router = require("./router/route")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const authrouter = require("./router/authroute")

dotenv.config()
const app = express()

app.use(cors({
    origin:'https://eco-vision-sable.vercel.app',
    credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/auth",authrouter)
app.use("/api",router)

try {
    mongoose.connect(process.env.MONGOOSEURI).then(()=>{
        console.log("Connected To MongoDB")
        app.listen(3000,()=>{
            console.log("Running on Port 3000")
        })
    })
} catch (error) {
    console.log("Unabel to Connect")
}