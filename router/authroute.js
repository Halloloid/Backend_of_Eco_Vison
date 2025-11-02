const express = require("express")
const {signin,Login} = require("../controller/authcontroller")
const authrouter = express.Router()

authrouter.post("/signin",signin)
authrouter.post("/Login",Login)

module.exports = authrouter