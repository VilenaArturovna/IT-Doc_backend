import { CommandBase } from '@libs/base-classes';

import { TelegramWebhookRequestDto } from './telegram-webhook.request.dto';

export class TelegramWebhookCommand extends CommandBase<TelegramWebhookRequestDto> {}
