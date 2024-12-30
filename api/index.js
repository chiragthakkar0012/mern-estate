import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()
mongoose.connect(process.env.MONGO).then((d)=>console.log('coonected to mongodb',d)).catch((err)=>console.log(err))
const app=express();

app.listen(3000,()=>
{
    console.log('Server is running on 3000 port 444 !')
})
