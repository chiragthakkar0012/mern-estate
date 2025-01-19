import {body,validationResult} from 'express-validator';
export const signupMiddleHandler=[
    //validation for username
    body('username')
    .notEmpty().withMessage('Username Is required')
    .isLength({min:3}).withMessage('Username must be 3 characters long'),

    //valoidation for email 
    body('email')
    .isEmail().withMessage('Email is required')
    .normalizeEmail(),

    //validatiton for password
    body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({min:6}).withMessage('Password must be at least 8 characters long')
    .matches(/\d/).withMessage('Password must contain at least one number')
    .matches(/[A-Za-z]/).withMessage('Password must contain at least one letter')
    .matches(/[$@\+\-\%#?&*]/).withMessage('Password must contain at least one special character'),

    (req,res,next)=>
    {
        const error=validationResult(req);
        if(!error.isEmpty())
        {
            return res.json({
                success:false,
                statusCode:400,
                message:error.array()[0].msg
            });
        }
        next();
    }


];