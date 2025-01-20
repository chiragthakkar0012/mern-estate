import { errHandler } from "./error.js";
import jwt from 'jsonwebtoken'
export const verifyToken=(req,res,next)=>
{
    const token=req.cookies.access_token;
     console.log(token);
    if(!token)
    {
        return next(errHandler(401,'Unauthorized'));
    }
   
        jwt.verify(token,process.env.JWT_SECRET,(err,user)=>
        {
            console.log(user);
            if(err) return next(errHandler(403,'Forbidden in jwt'));
            req.user=user;
            next();
        });
}