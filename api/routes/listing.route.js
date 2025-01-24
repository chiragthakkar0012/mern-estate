import express from 'express';
import {upload } from '../utils/multer.js'
import {verifyToken} from '../utils/authencator.js'
import { createListing,imageHandler,deleteListing,updateListing } from '../controllers/listing.controller.js';
const router=express.Router();
router.post('/create',verifyToken,createListing);
router.post('/imageUpload',upload.array('image',10),imageHandler);
router.delete('/delete/:id',verifyToken,deleteListing)
router.post('/update/:id',verifyToken,updateListing)
export default router;