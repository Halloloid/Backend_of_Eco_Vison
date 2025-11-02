const User = require("../model/user")
const bcrypt = require("bcryptjs")
const createToken = require("../utils/jwt")

const signin = async(req,res) => {
    try {
        const {username,password} = req.body;

        const existingUser = await User.findOne({username})
        if(existingUser) return res.status(400).json({message:"User Already Exists or Password is Wrong"});

        const hashpassword = await bcrypt.hash(password,10)
        const newUser = new User({username,password:hashpassword})
        await newUser.save();

        const token = createToken(newUser)
        res.status(201).json({
            message:"User Registered Successfully",
            user:{
                id:newUser._id,
                username:newUser.username
            },
            token
        })
    } catch (error) {
        res.status(500).json({message:"Signup Failed"})
        console.log(error);
    }
}

const Login = async(req,res) => {
    try {
        const {username,password} = req.body

        const user = await User.findOne({username});
        if(!user) return res.status(404).json({message:"User Not Found"});

        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch) return res.status(401).json({message:"Invalid Credentials"});

        const token = createToken(user)
        res.json({
            message:"Log in Successful",
            user:{
                id:user._id,
                username:user.username
            },
            token
        })
    } catch (error) {
        res.status(500).json({message:"Log in Failed"});
        console.log(error)
    }
}

module.exports = {
    signin,
    Login
}