import { Subjects } from './subjects'

export interface TicketCreatedEvents {
  subject: Subjects.TicketCreated;
  data: {
    id: String;
    title: String;
    price: number;
  };
}