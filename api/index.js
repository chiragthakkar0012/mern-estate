import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
dotenv.config()
mongoose.connect(process.env.MONGO).then(()=>console.log('coonected to mongodb')).catch((err)=>console.log(err))
const app=express();

app.listen(3000,()=>
{
    console.log('Server is running on 3000 port 444 !')
})
app.use("/api/user",userRouter)