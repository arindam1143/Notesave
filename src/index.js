//console.log("hi arindam");
const e = require("express");
const express=require("express");
const app=express();
const dotenv=require("dotenv");
dotenv.config();
//const avi =require("./avi.json");
const mongoose=require("mongoose");
const noteRouters = require("./Routes/noteRoutes");
const userRouter = require("./Routes/userRoutes");
const cors=require("cors");
app.use(express.json());

app.use(cors());
app.use("/users",userRouter);
app.use("/note",noteRouters);
app.get("/",(req,res)=>{
    res.send("hi my name is arindam");
})

/*app.get("/a",(req,res)=>{
    res.status(200).json(avi);
})

app.get("/random",(req,res)=>{
    let ind=Math.floor(Math.random()* avi.length);
    let val=avi[ind];
    res.status(200).json(val);
})
*/

const PORT=process.env.PORT ||5000;
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(PORT,()=>{
        console.log("server started port no is port"+PORT);
    })
})
.catch((error)=>{
    console.log(error);
})
