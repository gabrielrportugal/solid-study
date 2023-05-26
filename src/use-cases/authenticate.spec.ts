import { expect, describe, it, beforeEach} from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { AuthenticateUseCase } from './authenticate';
import { hash } from 'bcryptjs';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

describe('Authenticate Use Case', () => {
  let inMemoryUsersRepository: InMemoryUsersRepository;
  let sut:  AuthenticateUseCase;

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut =  new AuthenticateUseCase(inMemoryUsersRepository);
  });

  it('should be able to authenticate', async () => {
    const email = 'johndoe@test.com';
    const password = '123456';

    const password_hash = await hash(password, 6);

    await inMemoryUsersRepository.create({
      name: 'John Doe',
      email,
      password_hash
    });

    const {user} = await sut.execute({
      email,
      password
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should not be able to authenticate with wrong email', async () => {
    const email = 'johndoe@test.com';
    const password = '123456';

    await expect(() => 
      sut.execute({
        email,
        password
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const email = 'johndoe@test.com';
    const password_hash = await hash('123456', 6);

    await inMemoryUsersRepository.create({
      name: 'John Doe',
      email,
      password_hash
    });

    await expect(() => 
      sut.execute({
        email,
        password: '123123'
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});