import { QueryBase } from '@libs/base-classes';
import { SetWebhookRequestDto } from '@modules/telegram/queries';

export class SetWebhookQuery extends QueryBase<SetWebhookRequestDto> {}
