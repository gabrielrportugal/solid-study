import request from 'supertest';
import {app} from '@/app';
import { describe, expect, it, beforeAll, afterAll } from 'vitest';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { prisma } from '@/lib/prisma';

describe('Create Check In [e2e]', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });
  
  it('should be able to create a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app);

    const createdGym = await prisma.gym.create({
      data: {
        title: 'Javascript Gym',
        latitude: -22.8908167,
        longitude: -42.0255965,
      }
    });

    const response = await request(app.server)
      .post(`/gyms/${createdGym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -22.8908167,
        longitude: -42.0255965,
      });

    expect(response.statusCode).toBe(201);
  });
});