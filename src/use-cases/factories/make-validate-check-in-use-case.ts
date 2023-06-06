import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-is-repository';
import { ValidateCheckInUseCase } from '../validate-check-in';

// Factory Pattern
export function makeValidateCheckInUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository();

  const useCase = new ValidateCheckInUseCase(prismaCheckInsRepository);

  return useCase;
}