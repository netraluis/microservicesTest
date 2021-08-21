
import mongoose from 'mongoose';

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

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', TicketSchema);



export { Ticket };
