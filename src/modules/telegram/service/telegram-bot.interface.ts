import { ExceptionBase } from '@libs/base-classes';
import { ValidationException } from '@libs/exceptions';
import { Result } from '@libs/utils';
import {
  IDeadlineIsApproachingRequest,
  INewOrderHasBeenAssignedRequest,
  INewOrderHasBeenRegisteredRequest,
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
  ): Promise<Result<void, ExceptionBase>>;
  newTaskHasBeenAssigned(
    props: INewTaskHasBeenAssignedRequest,
  ): Promise<Result<void, ExceptionBase>>;
  newOrderHasBeenAssigned(
    props: INewOrderHasBeenAssignedRequest,
  ): Promise<Result<void, ExceptionBase>>;
  newOrderHasBeenRegistered(
    props: INewOrderHasBeenRegisteredRequest,
  ): Promise<Result<void, ExceptionBase>>;
  deadlineIsApproaching(
    props: IDeadlineIsApproachingRequest,
  ): Promise<Result<void, ExceptionBase>>;
  staffRegistered(
    props: IStaffRegisteredRequest,
  ): Promise<Result<void, ExceptionBase>>;
  taskCreated(tgId: string): Promise<Result<void, ExceptionBase>>;
  orderCreated(tgId: string): Promise<Result<void, ExceptionBase>>;
}
