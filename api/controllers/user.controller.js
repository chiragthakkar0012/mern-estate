import User from "../models/user.model.js"
import { errHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'
import { Listing } from "../models/listing.model.js"
export  const test=(req,res)=>
{
    res.json({"message":"hello world hello"})
}
export const updateHandler=async(req,res,next)=>
{
    if(req.user.id!==req.params.id)
    {
        return next(errHandler(401,'you can only update your own account'))
    }
    try 
    {
        if(req.body.password)
        {
            req.body.password=bcryptjs.hashSync(req.body.password,10);
        }

        const updateUser=await User.findByIdAndUpdate(req.params.id,{
            $set:
            {
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                avatar:req.body.avatar

            }
        },{new:true})

        const {password,...rest}=updateUser._doc;
        res.json(rest);
    } catch (error) {

        next(error)
    }
}
export const deleteUserHandler=async(req,res,next)=>
{
    if(req.user.id!== req.params.id) return next(errHandler(401,'You can only delete your own account'));
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json('user deleted Successfully')
    } catch (error) {
        next(error)
    }

}
export const getUserListing=async(req,res,next)=>
{  
     if(req.user.id!==req.params.id)
    {
          return next(errHandler(401,'You can Only see your own Listing'))
    }
    try 
    {
        const listing=await Listing.find({userRef:req.params.id});
        console.log(listing)
        if(listing.length==0)
            {
                
                return next(errHandler(401,'No Listing Found'));
                
            } 
         res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
  
}

export const getUser=async(req,res,next)=>
{
 try{
    const user=await User.findById(req.params.id);
    if(!user) return next(errHandler(401,'User Not Found'));
    const {password:pass,...rest}=user._doc;
    res.status(200).json(rest);
    
 } catch (error) {
    next(error);
 }
}