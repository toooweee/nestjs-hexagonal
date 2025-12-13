import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { USER_REPOSITORY } from './application/ports/user.repository.port';
import { InMemoryUserRepository } from './infrastructure/adapters/in-memory-user.repository';
import { UserController } from './presentation/user.controller';
import { FindByIdUseCase } from './application/use-cases/find-by-id.use-case';

@Module({
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    FindByIdUseCase,
    { provide: USER_REPOSITORY, useClass: InMemoryUserRepository },
  ],
})
export class UserModule {}
