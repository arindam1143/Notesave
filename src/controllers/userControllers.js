const userModel=require("../models/user");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const SECRET_KEY=process.env.SECRET_KEY;
const singup=async(req,res)=>{

    const{username,email,password}=req.body;
    try{
        const existingUser=await userModel.findOne({email:email});
        if(existingUser){
            return res.status(400).json({message:"user already exits"});
        }
        const hashedPassword=await bcrypt.hash(password,10);

        const result=await userModel.create({
            email:email,
            password:hashedPassword,
            username:username 
        });
       const token=jwt.sign({email:result.email, id:result._id},SECRET_KEY);
       res.status(201).json({user:result,token:token});
    }
    catch(err){
        console.log(error);
        res.send(500).json({message:"something went wrong"});
    }
}
const singin=async (req,res)=>{
const {email,password}=req.body;
try{
    const existingUser=await userModel.findOne({email:email});
        if(!existingUser){
            return res.status(404).json({message:"user doesnot exits"});
        }

        const matchpassword=await bcrypt.compare(password,existingUser.password);
        if(!matchpassword){
            return res.status(400).json({message:"password did not match"});
        }
        const token=jwt.sign({email:existingUser.email, id:existingUser._id},SECRET_KEY);
        res.status(200).json({user:existingUser,token:token});
}
catch(error){
    console.log(error);
    res.send(500).json({message:"something went wrong"});
}

}
module.exports={singup,singin};