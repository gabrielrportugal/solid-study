import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-is-repository';
import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-check-ins-history';

// Factory Pattern
export function makeFetchUserCheckInsHistoryUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository();

  const useCase = new FetchUserCheckInsHistoryUseCase(prismaCheckInsRepository);

  return useCase;
}