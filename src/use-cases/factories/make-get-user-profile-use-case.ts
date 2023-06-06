import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { GetUserProfileUseCase } from '../get-user-profile';

// Factory Pattern
export function makeGetUserProfileUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();

  const useCase = new GetUserProfileUseCase(prismaUsersRepository);

  return useCase;
}