import { GymsRepository } from '@/repositories/prisma/prisma-gyms-repository';
import { CreateGymUseCase } from '../create-gym';

// Factory Pattern
export function makeCreateGymUseCase() {
  const prismaGymsRepository = new GymsRepository();

  const useCase = new CreateGymUseCase(prismaGymsRepository);

  return useCase;
}