import express from 'express';
import { signup,signin, google, imgUploader } from '../controllers/auth.controller.js';
import { signupMiddleHandler } from '../middlewares/signup.middleware.js';
import { signinMiddleHandler } from '../middlewares/signin.middleware.js';
import { upload } from '../utils/multer.js';
const router=express.Router()

router.post("/signup",signupMiddleHandler,signup);
router.post("/signin",signinMiddleHandler,signin);
router.post('/google',google);
router.post('/upload',upload.single('image'),imgUploader);
export default router;