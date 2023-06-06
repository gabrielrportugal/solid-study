import request from 'supertest';
import {app} from '@/app';
import { describe, expect, it, beforeAll, afterAll } from 'vitest';

describe('Register [e2e]', () => {
  beforeAll(async () => {
    await app.ready();
  });


  afterAll(async () => {
    await app.close();
  });
  
  it('should be able to register', async () => {
    const response = await request(app.server)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'johndoe@test.com.br',
        password: '123456'
      });

    expect(response.statusCode).toBe(201);
  });
});