import { Prisma, Gym } from '@prisma/client';
import { FindManyNearbyParams, IGymsRepository } from '../gyms-repository.interface';

export class GymsRepository implements IGymsRepository {
  findById(id: string): Promise<Gym | null> {
    throw new Error('Method not implemented.');
  }
  create(data: Prisma.GymCreateInput): Promise<Gym> {
    throw new Error('Method not implemented.');
  }
  searchMany(query: string, page: number): Promise<Gym[]> {
    throw new Error('Method not implemented.');
  }
  findManyNearby(params: FindManyNearbyParams): Promise<Gym[]> {
    throw new Error('Method not implemented.');
  }

}