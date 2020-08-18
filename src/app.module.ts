import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { DateScalar } from './common/scalars/date.scalar';
import { EmailScalar } from './common/scalars/email.scalar';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: 'src/schema.gql',
      debug: process.env.NODE_ENV === 'development',
      playground: true
    }),
    UsersModule,
    PostModule,
  ],
  providers: [DateScalar, EmailScalar],
})
export class AppModule { }
