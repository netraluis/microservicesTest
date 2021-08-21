import { Publisher, Subjects, TicketCreatedEvent } from "@nltickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
  readonly subject = Subjects.TicketCreated;
  
}