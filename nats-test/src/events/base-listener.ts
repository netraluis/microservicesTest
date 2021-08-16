import nats, { Message, Stan } from 'node-nats-streaming';

export abstract class Listener {
  abstract subject: string;
  abstract queueGroupName: string;
  abstract onMessage(data: any, msg: Message): void;
  private client: Stan;
  // protected a subclass can redifined
  protected ackWait = 5 * 1000;

  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOptions() {
    /* 
      **setDeliverAllAvailable** every time a listner is subscribe or restart receiv all the events of the channel if we add **setDurableName** only receive the events that were not emited
      **setManualAckMode** to true makes that the ack is not send automocatic to the nats and the program send it with **msg.ack();**
      **setAckWait** customize acknoledge period
      **setDurableName** to inform the subscriber which events have been processed
    */ 
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName);
  }

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );

    // message is the event
    subscription.on('message', (msg: Message) => {
      console.log(`Message received: ${this.subject} / ${this.queueGroupName}`);

      const parsedData = this.parseMessage(msg);
      this.onMessage(parsedData, msg);
    });
  }

  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === 'string'
      ? JSON.parse(data)
      : JSON.parse(data.toString('utf8'));
      // parsing a buffer
  }
}