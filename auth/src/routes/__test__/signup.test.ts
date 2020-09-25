import request from 'supertest';
import { app } from '../../app';

it('should return 201 upon successfull signup.', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);
});

it('should return 400 with an invalid email.', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'testestcom',
      password: 'password',
    })
    .expect(400);
});
it('should return 400 with an invalid password.', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'tese@testcom',
      password: 'p',
    })
    .expect(400);
});

it('should return 400 with missing email and password.', async () => {
  return request(app).post('/api/users/signup').send({}).expect(400);
});
it('disallows duplicate emails.', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(400);
});
it('sets a cookie after sucessfull signup.', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'tese@test.com',
      password: 'password',
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});
