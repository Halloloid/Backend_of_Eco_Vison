const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    ecopoints:{
        type:Number,
        default:0
    }
})

const User = mongoose.model("Eco Users",userSchema)

module.exports = User