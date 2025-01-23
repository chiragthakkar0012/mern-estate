import express from 'express';
import {upload } from '../utils/multer.js'
import {verifyToken} from '../utils/authencator.js'
import { createListing,imageHandler } from '../controllers/listing.controller.js';
const router=express.Router();
router.post('/create',verifyToken,createListing);
router.post('/imageUpload',upload.array('image',10),imageHandler);
export default router;