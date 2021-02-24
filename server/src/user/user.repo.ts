import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserRepo {
  constructor(private prisma: PrismaService) {}

  async findByUsernameOrEmail(usernameOrEmail: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        OR: [
          { username: { equals: usernameOrEmail } },
          { email: { equals: usernameOrEmail } },
        ],
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: { email: { equals: email } },
    });
  }

  async findByUsername(email: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: { email: { equals: email } },
    });
  }

  async create(
    data: Omit<Prisma.UserCreateInput, 'updatedAt' | 'createdAt'> & {
      updatedAt?: Date;
      createdAt?: Date;
    },
  ): Promise<User> {
    const now = new Date();

    return this.prisma.user.create({
      data: {
        ...data,
        updatedAt: now,
        createdAt: now,
      },
    });
  }

  async updateById(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({ where: { id }, data });
  }

  async updateByEmail(
    email: string,
    data: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.prisma.user.update({ where: { email }, data });
  }
}
