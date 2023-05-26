import { expect, describe, it, beforeEach} from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { hash } from 'bcryptjs';
import { GetUserProfileUseCase } from './get-user-profile';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

describe('Get User Profile Use Case', () => {
  let inMemoryUsersRepository: InMemoryUsersRepository;
  let sut:  GetUserProfileUseCase;

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut =  new GetUserProfileUseCase(inMemoryUsersRepository);
  });

  it('should be able to get user profile', async () => {
    const password_hash = await hash('123456', 6);

    const createdUser = await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password_hash
    });

    const {user} = await sut.execute({
      userId: createdUser.id
    });

    expect(user.name).toEqual('John Doe');
  });

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() => 
      sut.execute({userId: 'invalid-id'}),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});