import { Inject, Injectable } from '@nestjs/common';
import {
  USER_REPOSITORY,
  type UserRepositoryPort,
} from '../ports/user.repository.port';
import { Email } from '../../domain/value-objects/email.vo';

@Injectable()
export class FindByEmailUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async execute(email: string) {
    const userEmail = Email.create(email);

    return this.userRepository.findByEmail(userEmail);
  }
}
