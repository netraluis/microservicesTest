import request from 'supertest';
import { app } from '../../app';

it('it responds with details about the current user', async()=> {
  const cookie = await global.signin()

  const res = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(res.body.currentuser.email).toEqual('test@test.com')
})

it('it responds with null if not authentificated', async()=> {
  // in this case no cookie is passed
  const res = await request(app)
    .get('/api/users/currentuser')
    .send()
    .expect(200);

  expect(res.body.currentuser).toEqual(null)
})