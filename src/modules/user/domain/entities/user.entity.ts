import { Email } from '../value-objects/email.vo';
import { UserId } from '../value-objects/user-id.vo';

export class User {
  constructor(
    private readonly id: UserId,
    private email: Email,
    private name: string,
    private readonly createdAt: Date,
    private updatedAt: Date,
  ) {}

  static create(id: UserId, email: Email, name: string) {
    if (!name || name.trim().length < 2) {
      throw new Error('Name must be at least 2 characters long');
    }

    return new User(id, email, name, new Date(), new Date());
  }

  getId(): UserId {
    return this.id;
  }

  getEmail(): Email {
    return this.email;
  }

  getName(): string {
    return this.name;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  updateName(name: string) {
    if (!name || name.trim().length < 2) {
      throw new Error('Name must be at least 2 characters long');
    }

    this.name = name;
    this.updatedAt = new Date();
  }

  updateEmail(email: Email) {
    this.email = email;
    this.updatedAt = new Date();
  }

  getAccountAge(): number {
    const now = new Date();
    return Math.ceil(Math.abs(+now - +this.createdAt) / (1000 * 60 * 60 * 24));
  }
}
