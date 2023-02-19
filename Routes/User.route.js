const express=require("express")
const {userModel}=require("../model/User.model")
const userRouter=express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')



userRouter.post("/register",async(req,res)=>{
    const {name,email,pass}=req.body
    try{
        bcrypt.hash(pass, 5,async(err, hash)=> {
        if(err){
            res.send({"msg":"something went wrong","err":err.message})
        }
        else{
            const user=new userModel({name,email,pass:hash})
            await user.save()
            res.send({"msg":"register is succesfull"})
        }
        })
       
    } catch(err){
        res.send({"msg":"something went wrong","err":err.message})
    }
    

})

userRouter.post("/login",async(req,res)=>{
    const{email,pass}=req.body
    try{
        
        const user=await userModel.find({email})
        console.log(user)
        if(user.length>0){
            bcrypt.compare(pass,user[0].pass,(err, result)=>{
                if(result){
                    let token = jwt.sign({ userId:user[0]._id}, 'masai');
                    res.send({"msg":"loggin is succesfull","token":token})
                }
                else{
                    res.send("poor")
                }
            });
           
        }
        else{
            res.send({"msg":"wrong credential"})
        }
    }

     catch(err){
        res.send({"msg":"something went wrong"})

    }

})

module.exports={
    userRouter
}