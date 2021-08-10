import express, { Request, Response, NextFunction } from 'express';
import { Ticket } from '../model/ticket';

const router = express.Router();

router.get('/api/tickets', 
async (req: Request, res: Response, next: NextFunction)=> {
  const tickets = await Ticket.find({});


  res.status(200).send(tickets);
})

export { router as indexTicketRouter }