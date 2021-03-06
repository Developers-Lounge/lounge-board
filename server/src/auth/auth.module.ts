import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'common/constants';
import { JwtStrategy } from './jwt.strategy';
import { AuthResolver } from './auth.resolver';
import { AuthMailer } from 'auth/auth.mailer';
import { UserModule } from 'user/user.module';
import { UserService } from 'user/user.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    UserModule,
  ],
  providers: [
    AuthService,
    AuthResolver,
    JwtStrategy,
    AuthMailer,
    UserService,
  ],
  exports: [AuthService, JwtModule, AuthMailer],
})
export class AuthModule {}
