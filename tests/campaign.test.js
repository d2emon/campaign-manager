import request from 'supertest';
import app from '../src/app';
import Campaign from '../src/models/campaign';
import User from '../src/models/user';

describe('Campaign API', () => {
  let token;
  let userId;

  beforeAll(async () => {
    const user = await User.create({
      email: 'gm@example.com',
      password: 'Password123',
      username: 'game_master',
      role: 'gm',
    });
    userId = user._id.toString();

    const loginRes = await request(app)
      .post('/auth/login')
      .send({ username: 'game_master', password: 'Password123' });

    token = loginRes.body.accessToken;
  });

  it('POST /api/v1/campaigns – создание кампании', async () => {
    const res = await request(app)
      .post('/api/v1/campaigns')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test Campaign', genre: 'fantasy' });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Test Campaign');
    expect(res.body.gameMaster).toBe(userId);
  });

  it('GET /api/v1/campaigns – список кампаний пользователя', async () => {
    const res = await request(app)
      .get('/api/v1/campaigns')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
