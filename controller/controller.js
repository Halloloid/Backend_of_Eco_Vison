const FormData = require("form-data")
const axios = require("axios")
// const fs = require("fs")
const User = require("../model/user")

const predict = async(req,res)=>{
    try {
        if(req.user){
            await User.findByIdAndUpdate(req.user.id,{ $inc:{ecopoints:10}});
        }
        const formData = new FormData()
        formData.append("file",req.file.buffer,req.file.originalname)
        response = await axios.post("https://waste-classifier-model.onrender.com/predict",formData,
            {headers:formData.getHeaders()}
        )
        res.json({
            message:"File Uploaded Successfully",
            data:response.data
        })
    } catch (error) {
        res.status(500).json({
            message:"File Upload Failed",
            error:error.message
        })
    }
}

const leaderBoard = async(req,res)=>{
    const topusers = await User.find().sort({ecopoints: -1}).limit(10).select("username ecopoints")
    res.json(topusers)
}

module.exports = {
    predict,
    leaderBoard
}