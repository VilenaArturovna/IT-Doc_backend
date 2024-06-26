import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const TelegramController = () =>
  applyDecorators(Controller(), ApiTags('telegram/webhook (developers only)'));
