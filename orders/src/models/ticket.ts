
import mongoose from 'mongoose';
// import { requireAuth, validateRequest, NotFoundError, OrderStatus, BadRequestError } from '@nltickets/common';

import { Order, OrderStatus } from './order'

// An interface that describes the properties
// that are requried to create a new Ticket
interface TicketAttrs {
  title: string;
  price: number;
  // userId: string;
}

// An interface that describes the properties
// that a Ticket Model has
interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
}

// An interface that describes the properties
// that a Ticket Document has
export interface TicketDoc extends TicketAttrs, mongoose.Document {
  isReserved(): Promise<boolean>
}

const ticketSchemaFields: Record<keyof TicketAttrs, any> = {
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  // userId: {
  //   type: String,
  //   required: true
  // },
}

const TicketSchema = new mongoose.Schema<TicketDoc,TicketModel>(ticketSchemaFields, {
  toJSON: {
    transform(doc, ret){
      ret.id = ret._id;
      delete ret._id;
    },
    versionKey: false
  }
});

TicketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};

TicketSchema.methods.isReserved = async function() {
  // this is equal to tocket doc that we just called 'isReserved' on 

    /**
   * run a query to look all orders. Find an order where the ticket is the ticket
   * we just found && the orders status !cancelled.
   * if we fin an order from that means the ticket is reserved
   */
     const exisitngOrder =  await Order.findOne({
      ticket: this!,
      status: {
        $in: [
          OrderStatus.Created,
          OrderStatus.AwaitingPayment,
          OrderStatus.Complete
        ]
      }
    })

    return !!exisitngOrder;

}

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', TicketSchema);



export { Ticket };
