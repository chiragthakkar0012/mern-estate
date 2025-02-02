import express from 'express';
import {deleteUserHandler, test, updateHandler,getUserListing,getUser} from '../controllers/user.controller.js'
import { verifyToken } from '../utils/authencator.js';
const router=express.Router();
router.get('/test',test);
router.post('/update/:id',verifyToken,updateHandler)
router.delete('/delete/:id',verifyToken,deleteUserHandler);
router.get('/listings/:id',verifyToken,getUserListing);
router.get('/:id',verifyToken,getUser);
export default router;