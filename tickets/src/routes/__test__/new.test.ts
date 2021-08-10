import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../model/ticket';

it('has a route handler listening to /api/tickets for post request', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .send({});

    expect(response.status).not.toEqual(404)
})

it('can only be accesed if the user is signed in', async () => {
  await request(app)
    .post('/api/tickets')
    .send({})
    .expect(401);
})

it('return status ohet than 401 if the user is signed in ', async () => {
  const cookie = global.signin()

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie',cookie)
    .send({})
    
    expect(response.status).not.toEqual(401);
})

it('returns an error if an invalid title is provided', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title:'',
      price: 10
    })
    .expect(400)
    
})

it('returns an error if an invalid price is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'asdasdasd',
      price: -10
    })
    .expect(400)

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'asdasdasd',
    })
    .expect(400)
  
})

it('creates a ticket with valid inputs ', async () => {
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'asadf', 
      price: 20
    })
    .expect(201)

  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
})