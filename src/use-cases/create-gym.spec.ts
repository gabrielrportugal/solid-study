import { expect, describe, it, beforeEach} from 'vitest';
import { CreateGymUseCase } from './create-gym';
import { compare } from 'bcryptjs';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';


describe('Create Gym Use Case', () => {
  let inMemoryGymsRepository: InMemoryGymsRepository;
  let sut: CreateGymUseCase;

  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository();
    sut =  new CreateGymUseCase(inMemoryGymsRepository);
  });

  it('should be able to create a gym', async () => {
    const { gym } = await sut.execute({
      title: 'Javascript Gym',
      description: null,
      phone: null,
      latitude: -22.8908167,
      longitude: -42.0255965,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});