import { Message } from 'node-nats-streaming';

import { Listener } from './base-listener';
import { TicketCreatedEvents } from './ticket-created-events';
import { Subjects } from './subjects';
export class TicketCreatedListener extends Listener<TicketCreatedEvents> {
  /**
   * subject: Subjects.TicketCreated = Subjects.TicketCreated;
   * it can be done the same with **readonly** 
   */ 
  readonly subject = Subjects.TicketCreated
  queueGroupName = 'payment-service';

  onMessage(data: TicketCreatedEvents['data'], msg:Message){
    console.log('Event data', data);
    console.log(data.price)

    msg.ack();
  }
}