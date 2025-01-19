import { body,validationResult } from "express-validator";
export const signinMiddleHandler=[
    body('email')
    .isEmail().withMessage('Email is required')
    .normalizeEmail(),
    body('password')
    .notEmpty().withMessage('Password is required')
    .matches(/[a-zA-Z0-9]+[$@!/+/-/%]/).withMessage('Password must contain letters,digits and special characters'),
    (req,res,next)=>
    {
        const error=validationResult(req);
        if(!error.isEmpty())
        {
            return res.json({
                statusCode:400,
                success:false,
                message:error.array()[0].msg
            })
        }
        next()
    }
]