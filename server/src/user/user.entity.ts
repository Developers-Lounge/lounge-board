import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  confirmationSentAt?: Date

  @Column()
  confirmedAt?: Date

  @Column()
  resetPasswordSentAt?: Date

  @Column()
  updatedAt: Date;

  @Column()
  createdAt: Date;
}