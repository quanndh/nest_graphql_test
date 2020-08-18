import { Field, ID, ObjectType } from 'type-graphql';
import { EmailScalar as Email } from '../../common/scalars/email.scalar';
import { Column, Entity, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
@ObjectType('User')
export class UserEntity {
  @Field()
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field()
  @Column()
  name: string;

  @Field(type => Email)
  @Column()
  email: string;

  @Field({ nullable: true })
  @Column()
  telephone?: string;

  @Field({ nullable: true })
  @Column()
  birthDate?: Date;

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt?: Date;

  @Column()
  active: boolean;
}
