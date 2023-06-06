import { Prisma, Gym } from '@prisma/client';
import { FindManyNearbyParams, IGymsRepository } from '../gyms-repository.interface';
import { prisma } from '@/lib/prisma';

export class GymsRepository implements IGymsRepository {
  async findById(id: string): Promise<Gym | null> {
    return prisma.gym.findUnique({
      where: {
        id
      }
    });
  }

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    return prisma.gym.create({data});
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    return prisma.gym.findMany({
      where: {
        title: {
          contains: query
        }
      },
      take: 20,
      skip: (page - 1) * 20,
    });
  }

  async findManyNearby({latitude, longitude}: FindManyNearbyParams): Promise<Gym[]> {
    const gyms = await prisma.$queryRaw<Gym[]>`
     SELECT * from gyms 
     WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `;

    return gyms;
  }

}