import nats, { Stan } from 'node-nats-streaming';

class NatsWrapper {
  // ? the variable will be undefined for a period of time 
  private _client?: Stan;

  /**
   * getter to acces the private _client
   */
  get client() {
    if(!this._client) {
      throw new Error('Cannot acces Nats client before connecting')
    }

    return this._client
  }

  connect(clusterId: string, clientId: string, url: string) : Promise<void> {
    this._client = nats.connect(clusterId, clientId, { url });

    return new Promise((resolve, reject) => {
      this.client.on('connect', () => {
        console.log('Connected to NATS');
        resolve();
      })

      this.client.on('error', (err) => {
        reject(err)
      })
    })
  }
}

export const natsWrapper = new NatsWrapper();