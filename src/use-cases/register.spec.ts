import { expect, describe, it, beforeEach} from 'vitest';
import { RegisterUseCase } from './register';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';


describe('Register Use Case', () => {
  let inMemoryUsersRepository: InMemoryUsersRepository;
  let sut: RegisterUseCase;

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut =  new RegisterUseCase(inMemoryUsersRepository);
  });

  it('should be able to register', async () => {
    const {user} = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456'
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should hash user password upon registration', async () => {
    const userPassword = '123456';

    const {user} = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: userPassword
    });

    const isPasswordCorrectlyHashed = await compare(
      userPassword,
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('should not be able to register the same email twice', async () => {
    const email = 'johndoe@test.com';

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456'
    });

    await expect(() => 
      sut.execute({
        name: 'John Doe',
        email,
        password: '123456'
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
  
});