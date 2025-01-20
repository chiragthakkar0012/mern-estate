import express from 'express';
import {test, updateHandler} from '../controllers/user.controller.js'
import { verifyToken } from '../utils/authencator.js';
const router=express.Router();
router.get('/test',test);
router.post('/update/:id',verifyToken,updateHandler)
export default router;