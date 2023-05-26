import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest';
import { CheckInUseCase } from './check-in';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { Decimal } from '@prisma/client/runtime/library';
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error';
import { MaxDistanceError } from './errors/max-distance-error';

describe('Check In Use Case', () => {
  let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
  let inMemoryGymsRepository: InMemoryGymsRepository;
  let sut: CheckInUseCase;

  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
    inMemoryGymsRepository = new InMemoryGymsRepository();
    
    sut =  new CheckInUseCase(
      inMemoryCheckInsRepository,
      inMemoryGymsRepository
    );
    
    await inMemoryGymsRepository.create({
      id: 'gym-01',
      title: 'Javascript Gym',
      description: null,
      phone: null,
      latitude: -22.8908167,
      longitude: -42.0255965,
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.8908167,
      userLongitude: -42.0255965,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022,0, 20, 8, 0, 0));

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.8908167,
      userLongitude: -42.0255965,
    });

    await expect(() => 
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -22.8908167,
        userLongitude: -42.0255965,
      })).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });

  it('should be able to check in in different days', async () => {
    vi.setSystemTime(new Date(2022,0, 20, 8, 0, 0));

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.8908167,
      userLongitude: -42.0255965,
    });

    vi.setSystemTime(new Date(2022,0, 21, 8, 0, 0));

    const {checkIn} = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -22.8908167,
      userLongitude: -42.0255965,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should be not able to check in on distant gym', async () => {
    await inMemoryGymsRepository.create({
      id: 'gym-02',
      title: 'Python Gym',
      description: null,
      phone: null,
      latitude: -22.9699733,
      longitude: -42.0339979,
    });

    await expect(() => 
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -22.8908167,
        userLongitude: -42.0255965,
      })).rejects.toBeInstanceOf(MaxDistanceError);
  });
});