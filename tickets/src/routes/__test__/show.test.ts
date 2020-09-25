import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it(`returns 404 if the ticket is not found`, async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  await request(app).get(`/api/tickets/${id}`).expect(404);
});

it('returns a ticket if the ticket is found.', async () => {
  const title = 'my ticket';
  const price = 20;
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({ title, price })
    .expect(201);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .expect(200);
  expect(ticketResponse.body.title).toEqual(title);
});
