import request from 'supertest';
import { app } from '../../app';

it('it returns a 201 om successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password: 'password'
    })
    .expect(201)
});

it('it returns a 400 with an invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
        email: 'testest.com',
        password: 'password'
    })
    .expect(400)
});

it('it returns a 400 with an invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password: 'p'
    })
    .expect(400)
});

it('it disallows duplicate emails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201)

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(400)
});

it('set a cookie after succesfull signup', async () => {
  const res = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201)

  expect(res.get('Set-Cookie')).toBeDefined()
});

