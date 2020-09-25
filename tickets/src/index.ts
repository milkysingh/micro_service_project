import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY is not defined.');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined.');
  }

  await natsWrapper.connect(
    'ticketing',
    'as234sfsddfasd',
    'http://nats-srv:4222'
  );
  natsWrapper.client.on('close', () => {
    console.log('NATS connection closed!');
    process.exit();
  });
  process.on('SIGINT', () => natsWrapper.client.close());
  process.on('SIGTERM', () => natsWrapper.client.close());
  await mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  });
  console.log('Connected to Db successfully');

  app.listen(3000, () => {
    console.log('Tickets Service listening on port 3000!');
  });
};

start();
