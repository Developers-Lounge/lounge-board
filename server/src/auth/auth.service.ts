import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Exception } from 'common/Exception';
import * as bcrypt from 'bcrypt';
import { LoginResponse, RegisterResponse } from 'graphql-schema';
import { LoginDto, RegisterDto, ResetPasswordDto } from 'auth/auth.dto';
import { decode } from 'common/jwt';
import { sendConfirmationDelayMs } from 'common/constants';
import { AuthMailer } from 'auth/auth.mailer';
import { UserService } from 'user/user.service';
import {User} from "user/user.entity";

const encryptPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

@Injectable()
export class AuthService {
  constructor(
    private authMailer: AuthMailer,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  signToken(user: { id: number }) {
    return this.jwtService.sign({
      sub: user.id,
    });
  }

  async login(args: LoginDto): Promise<LoginResponse> {
    const user = await this.userService.findByUsernameOrEmail(
      args.usernameOrEmail,
    );

    if (!user || !(await bcrypt.compare(args.password, user.password)))
      throw new Exception(
        HttpStatus.NOT_FOUND,
        'Email or password is incorrect',
      );

    if (!user.confirmedAt)
      throw new Exception(
        HttpStatus.UNPROCESSABLE_ENTITY,
        'You have to confirm your email address before continuing.',
      );

    return {
      user,
      accessToken: this.signToken(user),
    };
  }

  async register(args: RegisterDto): Promise<RegisterResponse> {
    try {
      const user = await this.userService.create({
        ...args,
        password: await encryptPassword(args.password),
      });

      this.authMailer.sendConfirmationInstructions(user);

      return { user: { id: user.id } };
    } catch (error) {
      if (error.message.includes('Unique constraint')) {
        const columnName = error.message.includes('email')
          ? 'Email'
          : 'Username';
        throw new Exception(HttpStatus.CONFLICT, `${columnName} is taken`);
      } else {
        throw error;
      }
    }
  }

  async verifyEmail(token: string): Promise<LoginResponse> {
    const data = decode(token);
    if (!data || typeof data !== 'object' || typeof data.email !== 'string')
      throw new Exception(
        HttpStatus.UNPROCESSABLE_ENTITY,
        'Reset password token is invalid',
      );

    const { email } = data;

    const user = await this.userService.findByEmail(email);
    if (!user)
      throw new Exception(
        HttpStatus.UNPROCESSABLE_ENTITY,
        'Reset password token is invalid',
      );

    await this.userService.updateById(user.id, {
      confirmedAt: new Date(),
    });

    return {
      user,
      accessToken: this.signToken(user),
    };
  }

  async isUsernameFree(username: string): Promise<boolean> {
    return !(await this.userService.findByUsername(username));
  }

  async isEmailFree(email: string): Promise<boolean> {
    return !(await this.userService.findByEmail(email));
  }

  async sendEmailConfirmation(email: string): Promise<boolean> {
    const user = await this.userService.findByEmail(email);

    if (!user)
      throw new Exception(
        HttpStatus.NOT_FOUND,
        'The email you entered does not belong to an active account.',
      );

    if (user.confirmedAt)
      throw new Exception(
        HttpStatus.UNPROCESSABLE_ENTITY,
        'Email was already confirmed, please try signing in',
      );

    const sentAt = user.confirmationSentAt;
    const now = new Date();

    if (sentAt && now.getTime() - sentAt.getTime() < sendConfirmationDelayMs)
      throw new Exception(HttpStatus.TOO_MANY_REQUESTS, 'Too many requests');

    await this.userService.updateByEmail(email, {
      confirmationSentAt: now,
    });

    this.authMailer.sendConfirmationInstructions({ email });

    return true;
  }

  async sendResetPassword(email: string): Promise<boolean> {
    const user = await this.userService.findByEmail(email);

    if (!user)
      throw new Exception(
        HttpStatus.NOT_FOUND,
        'The email you entered does not belong to an active account.',
      );

    const sentAt = user.resetPasswordSentAt;
    const now = new Date();

    if (sentAt && now.getTime() - sentAt.getTime() < sendConfirmationDelayMs)
      throw new Exception(HttpStatus.TOO_MANY_REQUESTS, 'Too many requests');

    await this.userService.updateByEmail(email, {
      resetPasswordSentAt: now,
    });

    this.authMailer.sendResetPasswordInstructions({ email });

    return true;
  }

  async resetPassword({
    token,
    password,
  }: ResetPasswordDto): Promise<LoginResponse> {
    const data = decode(token);
    let user: User | undefined
    if (data && typeof data === 'object' && typeof data.email === 'string')
      user = await this.userService.findByEmail(data.email)

    if (!user)
      throw new Exception(
        HttpStatus.UNPROCESSABLE_ENTITY,
        'Reset password token is invalid',
      );

    await this.userService.updateById(user.id, {
      password: await encryptPassword(password),
    });

    return {
      user,
      accessToken: this.signToken(user),
    };
  }
}
