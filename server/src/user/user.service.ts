import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByUsernameOrEmail(usernameOrEmail: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: [
        { username: usernameOrEmail },
        { email: usernameOrEmail },
      ],
    });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async findByUsername(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async create(
    data: Omit<User, 'id' | 'updatedAt' | 'createdAt'> & {
      updatedAt?: Date;
      createdAt?: Date;
    },
  ): Promise<User> {
    const now = new Date();

    return this.userRepository.save({
      ...data,
      updatedAt: now,
      createdAt: now,
    });
  }

  async updateById(id: number, data: Partial<User>) {
    await this.userRepository.update(id, data);
  }

  async updateByEmail(email: string, data: Partial<User>) {
    await this.userRepository.update({ email }, data);
  }
}
