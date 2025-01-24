import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import fs from 'fs';
import { errHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import cloundinary from '../utils/cloundinary.js'
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
              console.log(token);
              res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest);
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
              res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest)
              await emailSender(newuser.email,newuser.username);

           
              
            }
    }
    catch(err)
    {
      next(err)
    }
}

export const imgUploader=async(req,res,next)=>
  {
    if(!req.file)
    {
      return res.json({message:'Error uploading Image',success:false})
    }
    try
    {
      const file=req.file.path;
      const uploadResponse=await cloundinary.uploader.upload(file,{
        folder:'mern_user_images',
        public_id:`profile_pic${Date.now()}`,
        resource_type:'image',
      });
      fs.unlink(file,(err)=>
      {
        if(err)
        {
          console.error('Error deleting the file:', err);
        }
        else {
          console.log('File deleted successfully');
        }
      })
      res.status(200).json(
        {
          message:'Image uploaded successfully',
          image_url:uploadResponse.url,
          success:true
        }
      )

    }
    catch(error)
    {
      console.error('Error uploading to Cloudinary:', error);
      res.status(500).json({ error: 'Failed to upload image to Cloudinary',success:false });
    }
  } 
export const signOutHandler=async(req,res,next)=>
  {
       try 
       {
        res.clearCookie('access_token');
        res.status(200).json('User has been looged out')
        
       } catch (error) {
        next(error);
       }
  }