import { GymsRepository } from '@/repositories/prisma/prisma-gyms-repository';
import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms';

// Factory Pattern
export function makeFetchNearbyGymsUseCase() {
  const prismaGymsRepository = new GymsRepository();

  const useCase = new FetchNearbyGymsUseCase(prismaGymsRepository);

  return useCase;
}