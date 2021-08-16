import { Publisher } from './base-publisher';
import { TicketCreatedEvents } from './ticket-created-events';
import { Subjects } from './subjects';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvents> {
  readonly subject = Subjects.TicketCreated;
  
}