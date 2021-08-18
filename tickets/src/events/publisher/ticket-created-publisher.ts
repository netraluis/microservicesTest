import { Publisher, Subjects, TicketCreatedEvents } from "@nltickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvents>{
  readonly subject = Subjects.TicketCreated;
  
}