import { GymsRepository } from '@/repositories/prisma/prisma-gyms-repository';
import { SearchGymsUseCase } from '../search-gyms';

// Factory Pattern
export function makeSearchGymsUseCase() {
  const prismaGymsRepository = new GymsRepository();

  const useCase = new SearchGymsUseCase(prismaGymsRepository);

  return useCase;
}