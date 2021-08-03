import express, { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest, BadRequestError } from '@nltickets/common'


import { User } from '../models/user'

const router = express.Router();

router.post('/api/users/signup', 
[ 
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .trim()
    .isLength({ min: 4, max: 20})
    .withMessage('Password must be between 4 an 20 characters')
], 
validateRequest,
async (req: Request, res: Response, next: NextFunction)=>{
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email })

  if(existingUser){
    console.log('Email in use');
    return next(new BadRequestError('Email in use'))
  }

  const user = User.build({ email, password});
  await user.save();

  // generta Jwt
  const userJwt = jwt.sign(
    {
    id: user.id,
    email: user.email
    }, 
    // already is checked in index.js 
    process.env.JWT_KEY!
  );

  // Store it on session object
  req.session = { 
    jwt:userJwt 
  };

  res.status(201).send(user)

})

export { router as signupRouter };