import { User } from 'user/user.entity';

export const JWTSecret = process.env.JWT_SECRET;

export const delayBetweenSendingEmailConfirmationMs = 5000;
export const delayBetweenSendingResetPasswordMs = 5000;

const nodeEnv = process.env.NODE_ENV;

export const env = {
  production: nodeEnv === 'production',
  development: nodeEnv === 'development',
  test: nodeEnv === 'test',
};

export const openEmailsInDev = process.env.OPEN_EMAILS_IN_DEV === 'true';

export const dbUrl = env.test
  ? process.env.DATABASE_URL_TEST
  : process.env.DATABASE_URL;

export const typeORMConfig = {
  type: 'postgres' as const,
  url: dbUrl,
  entities: [User],
  keepConnectionAlive: true,
  logging: true,
};
