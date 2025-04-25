import request from 'supertest';
import app from '../src/app';
import Campaign from '../src/models/campaign';
import NPC from '../src/models/npc';

describe('NPC API', () => {
  let token;
  let campaignId;

  beforeAll(async () => {
    // Создаем тестовую кампанию
    const campaign = await Campaign.create({
      title: 'Test Campaign',
      gameMaster: '65d1a3f8a1b2c3d4e5f6a7b8',
    });
    campaignId = campaign._id.toString();

    // Логинимся как GM
    const loginRes = await request(app)
      .post('/auth/login')
      .send({ username: 'game_master', password: 'Password123' });
    token = loginRes.body.accessToken;
  });

  it('POST /api/v1/campaigns/:id/npc – добавление NPC', async () => {
    const res = await request(app)
      .post(`/api/v1/campaigns/${campaignId}/npc`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Gandalf', race: 'elf' });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Gandalf');

    // Проверяем, что NPC сохранен в БД
    const npc = await NPC.findOne({ name: 'Gandalf' });
    expect(npc).not.toBeNull();
  });
});
