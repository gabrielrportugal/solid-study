import request from 'supertest';
import {app} from '@/app';
import { describe, expect, it, beforeAll, afterAll } from 'vitest';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';

describe('Create Gym [e2e]', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });
  
  it('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JS Gym',
        description: 'Any Description',
        phone: '1199009900',
        latitude: -22.8908167,
        longitude: -42.0255965,
      });

    expect(response.statusCode).toBe(201);
  });
});