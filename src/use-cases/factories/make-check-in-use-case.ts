import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-is-repository';
import { GymsRepository } from '@/repositories/prisma/prisma-gyms-repository';
import { CheckInUseCase } from '../check-in';

// Factory Pattern
export function makeCheckInUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository();
  const prismaGymsRepository = new GymsRepository();

  const useCase = new CheckInUseCase(
    prismaCheckInsRepository,
    prismaGymsRepository
  );

  return useCase;
}