import { Module } from '@nestjs/common';
import { UserRepo } from 'user/user.repo';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  providers: [PrismaService, UserRepo],
  exports: [UserRepo],
})
export class UserModule {}
