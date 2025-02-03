import { Listing } from "../models/listing.model.js";
import fs from 'fs';
import cloudinary from '../utils/cloundinary.js'
import { errHandler } from "../utils/error.js";

export const createListing=async(req,res,next)=>
{
    try
    {
      const listing=await Listing.create(req.body);
      return res.status(201).json(listing);
    }
    catch(error)
    {
        next(error)
    }
}
export const imageHandler=async(req,res,next)=>
{
  if(!req.files)
    {
      return res.json({message:'Error uploading Image',success:false})
    }
    try 
    {   
      const uploadPromises=req.files.map(file=>
      {
        return  cloudinary.uploader.upload(file.path,{folder:'mern_user_images',public_id:`profile_pic${Date.now()}`,resource_type:'image',})
      })

      const results=await Promise.all(uploadPromises);
      const urls=results.map(result=>result.secure_url)
      req.files.forEach(file=>{
        fs.unlinkSync(file.path,(err)=>{
          if(err){console.log(err)};
        })
      });
       res.status(201).json(
        {
            success: true,
            message: 'Images uploaded successfully',
            data: urls
        }
       )
    } catch (error) {
      next(error);
    }
}
export const deleteListing=async(req,res,next)=>
{
  try {
  const listing=await Listing.findById(req.params.id);
  if(!listing) return next(errHandler(401,'Listing Not Found'));
  if(req.user.id!=listing.userRef)
  {
    return next(errHandler(401,'You are Allowed to delete your own listing'))
  }
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json('Deleted ')
    
  } catch (error) {
    next(error)
  }
}
export const updateListing=async(req,res,next)=>
{
  try 
  {
    const listing=await Listing.findById(req.params.id);
    if(!listing) return next(errHandler(401,'Listing Not Found'));
    if(req.user.id!=listing.userRef) return next(errHandler(401,'You can Update  your own listing Only'))
    const UpdatedListing=await Listing.findByIdAndUpdate(req.params.id,req.body,{new:true});
  if (!UpdatedListing) {
    return next(errHandler(500, 'Failed to update the listing')); // Handle update failure
  }
         res.status(201).json(UpdatedListing);
  } catch (error) {
    next(error); 
  }
}

export const getListing=async(req,res,next)=>
  {
      try
      {
        const listing=await Listing.findById(req.params.id);
        
        res.status(200).json(listing);
      } catch (error) {
        next(error);
      }
  }
export const getListings=async(req,res,next)=>
  {
    try 
    {
      const limit=parseInt(req.query.limit)|| 9;
      const startIndex=parseInt(req.query.startIndex)||0;
      let offer=req.query.offer;
      if(offer==undefined|| offer=='false')
      {
        offer={$in:[false,true]}
      }
      let furnished=req.query.furnished;
      if(furnished===undefined || furnished==='false')
        {
          furnished={$in:[false,true]}
        }
        let parking=req.query.parking;
        if(parking===undefined|| parking==='false')
          {
            parking={$in:[false,true]}
          }
        let type=req.query.type;
        if(type===undefined || type==='all')
          {
            type={ $in : ['sale','rent']};
          } 
        const searchTerm=req.query.searchTerm|| '';
        const sort =req.query.sort || 'createdAt';
        const order=req.query.order || 'desc'; 
        const listings=await Listing.find({
          $or:[{name:{$regex:searchTerm,$options:'i'}},{address:{$regex:searchTerm,$options:'i'}}],
          offer,
          furnished,
          parking,
          type,
        }).sort({[sort]:order}).limit(limit).skip(startIndex);
            res.status(200).json(listings)
    } 
    catch (error) 
    {
      next(error)
    }
  }