import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import {
  CreateUserDto,
  CreateUserUseCase,
} from '../application/use-cases/create-user.use-case';
import { User } from '../domain/entities/user.entity';
import { FindByIdUseCase } from '../application/use-cases/find-by-id.use-case';
import { FindByEmailUseCase } from '../application/use-cases/find-by-email.use-case';
import { FindAllUseCase } from '../application/use-cases/find-all.use-case';
import { DeleteUseCase } from '../application/use-cases/delete.use-case';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findAllUseCase: FindAllUseCase,
    private readonly findByIdUseCase: FindByIdUseCase,
    private readonly findByEmailUseCase: FindByEmailUseCase,
    private readonly deleteUseCase: DeleteUseCase,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.createUserUseCase.execute(createUserDto);
    return this.mapUserToResponse(user);
  }

  @Get()
  async findAll() {
    const users = await this.findAllUseCase.execute();

    return users.map((user) => {
      return this.mapUserToResponse(user);
    });
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string) {
    const user = await this.findByEmailUseCase.execute(email);

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return this.mapUserToResponse(user);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const user = await this.findByIdUseCase.execute(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return this.mapUserToResponse(user);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.deleteUseCase.execute(id);
  }

  private mapUserToResponse(user: User) {
    return {
      id: user.getId().getValue(),
      name: user.getName(),
      email: user.getEmail().getValue(),
      createdAt: user.getCreatedAt(),
      updatedAt: user.getUpdatedAt(),
      accountAge: user.getAccountAge(),
    };
  }
}
