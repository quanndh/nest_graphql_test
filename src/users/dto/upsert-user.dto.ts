import { IsOptional, IsMongoId } from 'class-validator';
import { Field, ArgsType } from 'type-graphql';
import { CreateUserDto } from './create-user.dto';

@ArgsType()
export class UpsertUserDto {
  @Field()
  userInput: CreateUserDto;
}
