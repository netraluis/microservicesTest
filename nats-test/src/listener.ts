import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';

import { TicketCreatedListener } from './events/ticket-created-listener';

console.clear();

const stanId = randomBytes(4).toString('hex')
const stan = nats.connect('ticketing', stanId, {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Listener connected to NATS');

  stan.on('close', () => {
    console.log('NATS connection closed!');
    process.exit();
  });

  // const options = stan
  //   .subscriptionOptions()
  //   .setManualAckMode(true)
  //   .setDeliverAllAvailable()
  //   .setDurableName('accounting-service');

  // const subscription = stan.subscribe(
  //   'ticket:created',
  //   'queue-group-name',
  //   options
  // );

  // subscription.on('message', (msg: Message) => {
  //   const data = msg.getData();

  //   if (typeof data === 'string') {
  //     console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
  //   }

  //   msg.ack();
  // });

  new TicketCreatedListener(stan).listen();
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());


