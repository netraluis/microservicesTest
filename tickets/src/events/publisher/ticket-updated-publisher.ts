import { Publisher, Subjects, TicketUpdatedEvent } from "@nltickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
  readonly subject = Subjects.TicketUpdated;
  
}