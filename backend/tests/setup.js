import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import User from '../src/models/user';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  await User.create({
    email: 'test@example.com',
    password: 'Password123',
    username: 'testuser',
  });
  await User.create({
    email: 'gm@example.com',
    password: 'Password123',
    username: 'game_master',
    role: 'gm',
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});