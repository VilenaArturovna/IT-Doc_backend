import {
  DeleteWebhookController,
  DeleteWebhookQueryHandler,
  GetWebhookInfoController,
  GetWebhookInfoQueryHandler,
  SetWebhookController,
  SetWebhookQueryHandler,
} from '@modules/telegram/queries/webhook';

export * from './webhook';

export const queriesControllers = [
  SetWebhookController,
  GetWebhookInfoController,
  DeleteWebhookController,
];

export const queryHandlers = [
  SetWebhookQueryHandler,
  GetWebhookInfoQueryHandler,
  DeleteWebhookQueryHandler,
];
