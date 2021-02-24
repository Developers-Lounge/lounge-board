import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'common/constants';
import { JwtStrategy } from './jwt.strategy';
import { AuthResolver } from './auth.resolver';
import { AuthMailer } from 'auth/auth.mailer';
import { UserModule } from 'user/user.module';
import { UserRepo } from 'user/user.repo';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    PrismaModule,
    UserModule,
  ],
  providers: [
    AuthService,
    AuthResolver,
    JwtStrategy,
    AuthMailer,
    PrismaService,
    UserRepo,
  ],
  exports: [AuthService, JwtModule, AuthMailer],
})
export class AuthModule {}
