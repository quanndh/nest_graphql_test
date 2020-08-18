import { ID } from 'type-graphql';
import { NotFoundException } from '@nestjs/common';
import { Query, Mutation, Args, Resolver } from '@nestjs/graphql';
import { UserEntity as User } from './entities/user.entity';
import { ListUsersEntity as listUsers } from './entities/list-users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpsertUserDto } from './dto/upsert-user.dto';
import { FindUsersDto } from './dto/find-users.dto';
import { UsersService } from './users.service';

@Resolver(of => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }

  @Query(returns => User)
  async user(@Args('id') id: number): Promise<User> {
    const user = await this.usersService.findUserById(id);
    if (!user) {
      throw new NotFoundException(id);
    }
    return user;
  }

  @Query(returns => listUsers)
  async users(@Args() queryArgs: FindUsersDto): Promise<listUsers> {
    return this.usersService.findUsers(queryArgs);
  }

  @Mutation(returns => User)
  async saveUser(@Args() mutationArgs: UpsertUserDto): Promise<User> {
    const { userInput }: { userInput: CreateUserDto } = mutationArgs;
    return this.usersService.upsertUser(userInput);
  }

  @Mutation(returns => Boolean)
  deleteLocation(@Args({ name: 'id', type: () => ID }) id: number): Promise<boolean> {
    return this.usersService.deleteUser(id);
  }
}