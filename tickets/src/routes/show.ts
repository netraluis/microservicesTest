import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { NotFoundError } from '@nltickets/common';
import { Ticket } from '../model/ticket';

const router = express.Router();

router.get('/api/tickets/:id', 
async (req: Request, res: Response, next: NextFunction)=> {
  const ticket = await Ticket.findById(req.params.id);

  if(!ticket){
    return next(new NotFoundError());
  }

  res.status(200).send(ticket);
})

export { router as showTicketRouter };