import mongoose from 'mongoose';
import express, { Request, Response, NextFunction } from 'express';
import { requireAuth, validateRequest, NotFoundError, OrderStatus, BadRequestError } from '@nltickets/common';
import { body } from 'express-validator';

import { Ticket } from '../models/ticket';
import { Order } from '../models/order';

const router = express.Router();

const EXPIRATION_WINDOW_SECONDS = 15 * 60;

router.post('/api/orders',
requireAuth,
[
  body('ticketId')
  .not()
  .isEmpty()
  .custom((input: string)=>mongoose.Types.ObjectId.isValid(input))
  .withMessage('TicketId must be provided')
],
validateRequest,
 async (req: Request, res: Response, next: NextFunction) => {
   const { ticketId } = req.body;

  // Find the ticket the user is trying to order in the database
  const ticket = await Ticket.findById(ticketId);
  if(!ticket){
    return next(new NotFoundError())
  }

  // This ticket is not already reserved
  const isReserved = await ticket!.isReserved();
  if(isReserved){
    return next(new BadRequestError('Ticket is already reserved'))
  }

  // Calculate an expiration date for this order
  const expiration = new Date();
  expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS );

  // Build the order and save it to the database
  const order = Order.build({
    // we say with ! that we are sure currentUser is defined
    userId: req.currentUser!.id,
    status: OrderStatus.Created,
    expiresAt: expiration,
    ticket: ticket!
  })
  await order.save();

  // Publish an event an event saying that an order was created

  res.status(201).send(order)
})

export { router as createOrderRouter}