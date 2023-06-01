import { expect, describe, it, beforeEach } from 'vitest';
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';

describe('Fetch Nearby Gyms Use Case', () => {
  let gymsRepository: InMemoryGymsRepository;
  let sut: FetchNearbyGymsUseCase;

  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    
    sut =  new FetchNearbyGymsUseCase(
      gymsRepository,
    );
  });

  it('should be able to fetch nearby for gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -22.8908167,
      longitude: -42.0255965,
    });

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: - 30.8905565,
      longitude: -55.532001,
    });

    const { gyms } = await sut.execute({
      userLatitude: -22.8908167,
      userLongitude: -42.0255965,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({title: 'Near Gym'}),
    ]);
  });
});