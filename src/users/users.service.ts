import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { FindUsersDto } from './dto/find-users.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ListUsersEntity } from './entities/list-users.entity';
import { UserRepository } from './repositories/user.repository';
import { ServiceHelper } from '../common/helpers/service.helper';

@Injectable()
export class UsersService {
  constructor(private readonly serviceHelper: ServiceHelper, private readonly userRepository: UserRepository) { }

  async findUserById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: {
        id: id,
        active: true,
      },
    });
  }

  async findUsers(params: FindUsersDto): Promise<ListUsersEntity> {
    return await this.serviceHelper.findAllByNameOrIds(params, this.userRepository);
  }

  async upsertUser(user: CreateUserDto): Promise<UserEntity> {
    const { email }: { email: string } = user;
    const userExists: UserEntity = await this.userRepository.findOne({
      where: {
        email,
        active: true,
      },
    });

    if (userExists) {
      throw new Error(`E-mail ${email} is already in use.`);
    }

    const newUser: UserEntity = await this.serviceHelper.getUpsertData(user, this.userRepository);

    return this.userRepository.save({ ...newUser, active: true });
  }

  async deleteUser(id: number): Promise<boolean> {
    const user: UserEntity = await this.userRepository.findOne(id);
    return Boolean(this.userRepository.save({ ...user, active: false }));
  }
}
