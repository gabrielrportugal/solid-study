import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { AuthenticateUseCase } from '../authenticate';

// Factory Pattern
export function makeAuthenticateUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();

  const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository);

  return authenticateUseCase;
}