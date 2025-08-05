import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput, UpdateUserInput } from './dto/user.input';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => String)
  async getUsers(): Promise<string> {
    return 'Users query - implementation needed';
  }

  @Mutation(() => String)
  async createUser(@Args('input') input: CreateUserInput): Promise<string> {
    return 'Create user mutation - implementation needed';
  }
}
