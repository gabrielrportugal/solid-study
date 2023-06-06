import request from 'supertest';
import {app} from '@/app';
import { describe, expect, it, beforeAll, afterAll } from 'vitest';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { prisma } from '@/lib/prisma';

describe('Validate Check In [e2e]', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });
  
  it('should be able to validate a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app);

    const user = await prisma.user.findFirstOrThrow();

    const createdGym = await prisma.gym.create({
      data: {
        title: 'Javascript Gym',
        latitude: -22.8908167,
        longitude: -42.0255965,
      }
    });

    let checkIn = await prisma.checkIn.create({
      data: {
        gym_id: createdGym.id,
        user_id: user.id
      }
    });

    const response = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toBe(204);

    checkIn = await prisma.checkIn.findUniqueOrThrow({
      where: {
        id: checkIn.id
      }
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
  });
});