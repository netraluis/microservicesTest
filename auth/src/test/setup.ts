import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app'
import request from 'supertest';

declare global {
  // var is needed to be a available out of the scope
  var signin: () => Promise<string[]>;
}

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
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections){
    await collection.deleteMany({})
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close()
})

global.signin = async () => {
  const email = 'test@test.com';
  const password = 'password';

  const res = await request(app)
    .post('/api/users/signup')
    .send({
      email,
      password
    })
    .expect(201);

  const cookie = res.get('Set-Cookie')
  return cookie
}