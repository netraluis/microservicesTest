import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest, currentUser } from '@nltickets/common';
import { Ticket } from '../model/ticket';

const router = express.Router();

router.post('/api/tickets', 
currentUser,
requireAuth,
[
  body('title')
  .not()
  .isEmpty()
  .withMessage('Title is required'),
  body('price')
  .isFloat({ gt: 0})
  .withMessage('Price must be grater than 0')
], 
validateRequest, 
async (req: Request, res: Response, next: NextFunction)=> {
  const { title, price } = req.body;
  const ticket = Ticket.build({
    title,
    price,
    userId: req.currentUser!.id
  });
  await ticket.save();

  res.status(201).send(ticket);
})

export { router as createTicketRouter }