import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthModule } from 'auth/auth.module';
import { GraphQLError } from 'graphql';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestsController } from 'tests/tests.controller';
import { env, typeORMConfig } from 'config';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      definitions: {
        path: join(process.cwd(), 'src/graphql-schema.ts'),
        outputAs: 'class',
      },
      formatError: (error: GraphQLError) => {
        return {
          status: error.extensions.exception.status,
          message: error.extensions.exception.message || error.message,
        };
      },
    }),
    TypeOrmModule.forRoot(typeORMConfig),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: env.test ? [TestsController] : [],
})
export class AppModule {}
