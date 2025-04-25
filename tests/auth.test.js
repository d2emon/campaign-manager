import request from 'supertest';
import app from '../src/app';
import User from '../src/models/user';
import { refreshToken } from '../src/handlers/users';

describe('Auth API', () => {
  beforeAll(async () => {
    const user = await User.create({
      email: 'test@example.com',
      password: 'Password123',
      username: 'testuser',
    });
  });

  it('POST /auth/register – успешная регистрация', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ username: 'newuser', email: 'new@example.com', password: 'Password123' });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('accessToken');
  });

  it('POST /auth/login – успешный вход', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ username: 'testuser', password: 'Password123' });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('accessToken');
  });

  it('POST /auth/login – ошибка при неверном пароле', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ username: 'testuser', password: 'wrong' });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Неверное имя пользователя или пароль');
  });

  it('POST /auth/logout – успешный выход', async () => {
    const res = await request(app)
      .post('/auth/logout')
      .send({ refreshToken: 'mockrefreshtoken' });

    expect(res.status).toBe(204);
  });

  it('POST /auth/refresh-token – успешное обновление токена', async () => {
    const user = await User.create({
        email: 'refresh@example.com',
        password: 'Password123',
        username: 'refreshuser',
        refreshTokens: [
          {
            token: 'mockrefreshtoken',
            expiresAt: new Date(Date.now() + 60 * 60 * 1000),
          },
        ],
      });
      console.log(user);

      const res = await request(app)
      .post('/auth/refresh-token')
      .send({ refreshToken: 'mockrefreshtoken' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('accessToken');
  });
});
