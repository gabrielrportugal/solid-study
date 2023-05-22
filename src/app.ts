import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

prisma.user.create({
  data: {
    name: 'Gabriel Portugal',
    email: 'gabrielrportugal@outlook.com'
  }
});

export const app = fastify();