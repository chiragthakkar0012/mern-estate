import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import {emailSender}  from '../utils/emailtransporter.js';
export const signup= async(req,res,next)=>
{
   const {username,email,password}=req.body;
   const hashpassword=bcryptjs.hashSync(password,10);
   const newUser=new User({username,email,password:hashpassword});
   try 
   {
    await newUser.save();
    res.status(201).json("User created succesfully");
   }
   catch(error)
   {
      next(error);
   }
   
  
}
export const signin=async (req,res,next)=>
{
    const {email,password}=req.body;
    try 
    {
          const validUser=await User.findOne({email:email});
          if(!validUser)
          {
            return next(errHandler(404,'User not Found'));
          }
          const validPassword=bcryptjs.compareSync(password,validUser.password);
          if(!validPassword )return next(errHandler(401,'Wrong Credientials'));
          const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET);
          const {password:pass,...rest}=validUser._doc;
          res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest);
          await emailSender(validUser.email,validUser.username);     
    }
    catch(error)
    {
      next(error)
    }

}
export const google=async (req,res,next)=>
{
    if(!(req.body.email && req.body.name))
    {
        next(errHandler(400,'Error in signing'))
    }
    try 
    {
            const user=await User.findOne({email:req.body.email});
            if(user)
            {
              const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
              const{password:pass,...rest}=user._doc;
              res.cookie('acces_token',token,{httpOnly:true}).status(200).json(rest);
              await emailSender(user.email,user.username); 
            }
            else
            {
              const generatedPassword=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
              const hashpassword=bcryptjs.hashSync(generatedPassword,10);
              const newuser=new User({username:req.body.name.split(" ").join("").toLowerCase()+Math.random().toString(36).slice(-4),email:req.body.email,password:hashpassword,avatar:req.body.photo});
              await newuser.save();
              const token=jwt.sign({id:newuser._id},process.env.JWT_SECRET);
              const{password:pass,...rest}=newuser._doc;
              res.cookie('acces_token',token,{httpOnly:true}).status(200).json(rest)
              await emailSender(newuser.email,newuser.username);

           
              
            }
    }
    catch(err)
    {
      next(err)
    }
}