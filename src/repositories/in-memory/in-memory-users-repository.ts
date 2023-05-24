import { Prisma, User } from '@prisma/client';
import { IUsersRepository } from '../users-repository.interface';

export class InMemoryUsersRepository implements IUsersRepository {
  public items: User[] = [];

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date()
    };

    this.items.push(user);

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find(item => item.email === email);
  
    if (!user) {
      return null;
    }

    return user;
  }
  
}