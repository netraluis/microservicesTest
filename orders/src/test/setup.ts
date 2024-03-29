import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
  // var is needed to be a available out of the scope
  var signin: () => string[];
}

jest.mock('../nats-wrapper.ts');

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY ='asdafsdfsdf';

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections){
    await collection.deleteMany({})
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close()
})

global.signin = () => {
  // build a JWT payload { id, email }
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(), 
    email: 'test@test.com',
  }
  // create a JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session object. { jwt: MY_JWT}
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session)

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // return string with enconded data
  return[ `express:sess=${base64}`];
}