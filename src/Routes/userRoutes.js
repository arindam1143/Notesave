const express=require("express");
const { singup, singin } = require("../controllers/userControllers");
const userRouter=express.Router();

userRouter.post("/signUp",singup)

userRouter.post("/signin",singin);

module.exports=userRouter;