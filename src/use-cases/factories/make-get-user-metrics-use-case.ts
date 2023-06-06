import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-is-repository';
import { GetUserMetricsUseCase } from '../get-user-metrics';

// Factory Pattern
export function makeGetUserMetricsUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository();

  const useCase = new GetUserMetricsUseCase(prismaCheckInsRepository);

  return useCase;
}