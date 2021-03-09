import { Controller, Get, Query } from '@nestjs/common';
import { Public } from 'lib/decorators/public.decorator';
import {
  patchPgClient,
  startTransaction,
  rollbackTransaction,
} from 'tests/patch-pg-client-for-transactional-tests';
import { sentEmailsForTests } from 'lib/mailer';

@Controller('tests')
export class TestsController {
  constructor() {
    patchPgClient();
  }

  @Public()
  @Get('startTransaction')
  async startTransaction() {
    startTransaction();
  }

  @Public()
  @Get('rollbackTransaction')
  async rollbackTransaction() {
    rollbackTransaction();
  }

  @Public()
  @Get('emails')
  emails(@Query() query) {
    const limit = query.limit && parseInt(query.limit);
    if (limit && !isNaN(limit)) return sentEmailsForTests.slice(-limit);
    else return sentEmailsForTests;
  }

  @Public()
  @Get('__coverage__')
  coverage() {
    return { coverage: (global as any).__coverage__ };
  }
}
