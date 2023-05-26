import { expect, describe, it, beforeEach } from 'vitest';
import { GetUserMetricsUseCase } from './get-user-metrics';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';

describe('Get User Metrics Use Case', () => {
  let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
  let sut: GetUserMetricsUseCase;

  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
    
    sut =  new GetUserMetricsUseCase(
      inMemoryCheckInsRepository,
    );
  });

  it('should be able to get check-ins count from metrics', async () => {
    await inMemoryCheckInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01'
    });

    await inMemoryCheckInsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01'
    });

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    });

    expect(checkInsCount).toEqual(2);
  });
});