import { Controller, Get, HttpCode } from '@nestjs/common';
import { Public } from '@src/common';

@Controller()
export class AppController {
  @Public()
  @Get()
  @HttpCode(200)
  async get() {}
}
