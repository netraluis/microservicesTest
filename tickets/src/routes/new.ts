import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest, currentUser } from '@nltickets/common';

const router = express.Router();

router.post('/api/tickets', 
(req: Request, res:Response, next: NextFunction)=> {
  console.log('hola midd')
  return next()
},
currentUser,
requireAuth,
[
  body('title')
    .not()
    .isEmpty()
    .withMessage('Title is required')
], 
validateRequest, 
async (req: Request, res: Response, next: NextFunction)=> {
  console.log('hola')
  res.status(200)
})

export { router as createTicketRouter }