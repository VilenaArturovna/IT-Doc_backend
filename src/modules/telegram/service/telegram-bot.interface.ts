import { ValidationException } from '@libs/exceptions';
import { Result } from '@libs/utils';
import {
  IDeadlineIsApproachingRequest,
  INewOrderHasBeenAssignedRequest,
  INewTaskHasBeenAssignedRequest,
  ISendWelcomeMessageRequest,
  IStaffRegisteredRequest,
} from '@modules/telegram/service/telegram-bot.types';

export interface TelegramBotInterface {
  setWebhook(domain: string): Promise<Result<void, ValidationException>>;
  deleteWebhook(): Promise<Result<void, ValidationException>>;
  getWebhookInfo(): Promise<Result<string, ValidationException>>;

  sendWelcomeMessage(
    props: ISendWelcomeMessageRequest,
  ): Promise<Result<void, ValidationException>>;
  newTaskHasBeenAssigned(
    props: INewTaskHasBeenAssignedRequest,
  ): Promise<Result<void, ValidationException>>;
  newOrderHasBeenAssigned(
    props: INewOrderHasBeenAssignedRequest,
  ): Promise<Result<void, ValidationException>>;
  deadlineIsApproaching(
    props: IDeadlineIsApproachingRequest,
  ): Promise<Result<void, ValidationException>>;
  staffRegistered(
    props: IStaffRegisteredRequest,
  ): Promise<Result<void, ValidationException>>;
}
