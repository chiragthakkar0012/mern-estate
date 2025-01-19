import express from 'express';
import { signup,signin, google } from '../controllers/auth.controller.js';
import { signupMiddleHandler } from '../middlewares/signup.middleware.js';
import { signinMiddleHandler } from '../middlewares/signin.middleware.js';
const router=express.Router()

router.post("/signup",signupMiddleHandler,signup);
router.post("/signin",signinMiddleHandler,signin);
router.post('/google',google);
export default router;