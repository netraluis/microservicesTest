import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest, NotFoundError, NotAuthorizedError } from '@nltickets/common';
import { Ticket } from '../model/ticket';

const router = express.Router();

router.put('/api/tickets/:id', 
requireAuth,
[
  body('title')
  .not()
  .isEmpty()
  .withMessage('Title is required'),
  body('price')
  .isFloat({ gt: 0})
  .withMessage('Price must be greater than 0')
], 
validateRequest, 
async (req: Request, res: Response, next: NextFunction)=> {
  const ticket = await Ticket.findById(req.params.id);

  if(!ticket){
    return next(new NotFoundError())
  }

  if(ticket.userId !== req.currentUser!.id){
    return next(new NotAuthorizedError())
  }

  ticket.set(req.body);
  await ticket.save();
  
  res.status(200).send(ticket);
})

export { router as updateTicketRouter }