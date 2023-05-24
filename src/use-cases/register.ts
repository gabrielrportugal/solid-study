import { IUsersRepository } from '@/repositories/users-repository.interface';
import { hash } from 'bcryptjs';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';
import { User } from '@prisma/client';

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    email,
    name,
    password
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const passwordHash = await hash(password, 6);
  
    const userWithSameEmail = await this.usersRepository.findByEmail(email);
  
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }
  
    const user = await this.usersRepository.create({
      email,
      name,
      password_hash: passwordHash
    });

    return {
      user
    };
  }
}
