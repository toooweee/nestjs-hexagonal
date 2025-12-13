import { UserRepositoryPort } from '../../application/ports/user.repository.port';
import { User } from '../../domain/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { UserId } from '../../domain/value-objects/user-id.vo';
import { Email } from '../../domain/value-objects/email.vo';

@Injectable()
export class InMemoryUserRepository implements UserRepositoryPort {
  private readonly users: Map<string, User> = new Map();

  async save(user: User) {
    this.users.set(user.getId().getValue(), user);
    return Promise.resolve(user);
  }

  async findAll() {
    return Promise.resolve(Array.from(this.users.values()));
  }

  async findById(id: UserId) {
    return Promise.resolve(this.users.get(id.getValue()) || null);
  }

  async findByEmail(email: Email) {
    return Promise.resolve(
      Array.from(this.users.values()).find(
        (user) => user.getEmail().getValue() === email.getValue(),
      ) || null,
    );
  }

  delete(id: UserId) {
    this.users.delete(id.getValue());
  }
}
