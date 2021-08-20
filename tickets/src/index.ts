import mongoose from 'mongoose';
import { randomBytes } from 'crypto';

import { app } from './app'
import { natsWrapper } from './nats-wrapper'

const start = async () => {
  if(!process.env.JWT_KEY){
    throw new Error('JWT_KEY must be defined')
  }

  if(!process.env.MONGO_URI){
    throw new Error('MONGO_URI must be defined')
  }

  try{
    /**
     * in the infra/k8s/nats-depl.yaml
     * -cid (cluster id) which is ticketing
     * defines the cluster
     */
    await natsWrapper.connect('ticketing', randomBytes(4).toString('hex'), 'http://nats-srv:4222');
    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });

    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useCreateIndex: true
    })

    console.log('connected to mongoDb')
  }catch(err){
    console.error(err)
  }
}

start()

app.listen(3000, ()=>{
  console.log('Listening in port 3000!!!!!!!!!')
});