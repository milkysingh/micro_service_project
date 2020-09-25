import request from 'supertest';
import { app } from '../../app';

it('should return 200 on successful signin', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);
  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);
  expect(response.get('Set-Cookie')).toBeDefined();
});
it('fails when a email that doesnot exist is supplied', async () => {
  return request(app)
    .post('/api/users/signin')
    .send({
      email: 'tests@test.com',
      password: 'password',
    })
    .expect(400);
});
