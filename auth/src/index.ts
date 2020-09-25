import mongoose from 'mongoose';
import { app } from './app';
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY is not defined.');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined.');
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log('Connected to Db successfully');
  } catch (error) {
    console.log('sdfs');
    console.log({ error });
  }

  app.listen(3000, () => {
    console.log('Auth Service listening on port 3000!');
  });
};

start();
