import mongoose from 'mongoose';
import { OrderStatus } from '@nltickets/common';

import { TicketDoc } from './ticket'

// An interface that describes the properties
// that are requried to create a new Order
interface OrderAttrs {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  ticket: TicketDoc;
}

// An interface that describes the properties
// that a Order Model has
interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

// An interface that describes the properties
// that a Order Document has
interface OrderDoc extends OrderAttrs, mongoose.Document {
  
}

const ticketSchemaFields: Record<keyof OrderAttrs, any> = {
  userId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: Object.values(OrderStatus),
    default: OrderStatus.Created
  },
  expiresAt: {
    type: mongoose.Schema.Types.Date,
  },
  ticket: {
    type:  mongoose.Schema.Types.ObjectId,
    ref: 'Ticket'
  },
}

const OrderSchema = new mongoose.Schema<OrderDoc,OrderModel>(ticketSchemaFields, {
  toJSON: {
    transform(doc, ret){
      ret.id = ret._id;
      delete ret._id;
    },
    versionKey: false
  }
});

OrderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>('Order', OrderSchema);



export { Order };
