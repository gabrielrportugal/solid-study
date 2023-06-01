import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest';
import { ValidateCheckInUseCase } from './validate-check-in';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { LateCheckInValidationError } from './errors/late-check-in-validation-error';

describe('Validate Check In Use Case', () => {
  let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
  let sut: ValidateCheckInUseCase;

  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
    
    sut =  new ValidateCheckInUseCase(
      inMemoryCheckInsRepository,
    );


    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to validate the check-in', async () => {
    const createdCheckIn = await inMemoryCheckInsRepository.create({
      gym_id: 'gym_01',
      user_id: 'user_01'
    });

    const {checkIn} = await sut.execute({
      checkInId: createdCheckIn.id
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
    expect(inMemoryCheckInsRepository.items[0].validated_at).toEqual(expect.any(Date));
  });

  it('should not be able to validate an nonexistent check-in', async () => {
    await expect(() =>  sut.execute({
      checkInId: 'invalid_id'
    })).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it('should not be able to validate the checkin after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40));

    const createdCheckIn = await inMemoryCheckInsRepository.create({
      gym_id: 'gym_01',
      user_id: 'user_01'
    });

    const TWENTY_ONE_MINUTES_IN_MS = 1000 * 60 * 21;

    vi.advanceTimersByTime(TWENTY_ONE_MINUTES_IN_MS);

    await expect(() =>  sut.execute({
      checkInId: createdCheckIn.id
    })).rejects.toBeInstanceOf(LateCheckInValidationError);
  });
});