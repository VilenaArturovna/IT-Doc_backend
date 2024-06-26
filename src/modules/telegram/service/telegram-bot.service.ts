import { ExceptionBase } from '@libs/base-classes';
import { DomainException, ValidationException } from '@libs/exceptions';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import {
  IDeadlineIsApproachingRequest,
  INewOrderHasBeenAssignedRequest,
  INewOrderHasBeenRegisteredRequest,
  INewTaskHasBeenAssignedRequest,
  ISendWelcomeMessageRequest,
  IStaffRegisteredRequest,
  SendMessageError,
  SendMessageResponse,
  TelegramBotDeleteMessage,
  TelegramBotInterface,
  TelegramBotSendMessageData,
  WebhookResponse,
} from '@modules/telegram/service';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';

export class TelegramBotService implements TelegramBotInterface {
  private axiosInstance: AxiosInstance;
  private readonly domain: string;

  constructor(private readonly configService: ConfigService) {
    const token = this.configService.get<string>('telegram.token');
    this.axiosInstance = axios.create({
      baseURL: 'https://api.telegram.org/bot' + token,
    });
    this.domain = this.configService.get<string>('domain');
  }

  private async sendMessage(
    data: TelegramBotSendMessageData,
  ): Promise<SendMessageResponse | SendMessageError> {
    try {
      return await this.axiosInstance.post('/sendMessage', data);
    } catch (e) {
      return e.response;
    }
  }

  public async deleteMessage(data: TelegramBotDeleteMessage) {
    try {
      return await this.axiosInstance.post('/deleteMessage', data);
    } catch (e) {
      console.log('telegram delete message', e);
    }
  }

  //webhook
  public async deleteWebhook(): Promise<Result<void, ValidationException>> {
    try {
      const res: WebhookResponse = await this.axiosInstance.get(
        `/getWebhookInfo`,
      );

      if (res.data.ok && res.data.result.url) {
        const result: WebhookResponse = await this.axiosInstance.get(
          `/deleteWebhook?url=${res.data.result.url}`,
        );

        if (result.data.ok) {
          return Result.ok();
        } else {
          return Result.fail(new ValidationException(result.data.description));
        }
      }

      if (!res.data.ok) {
        return Result.fail(new ValidationException(res.data.description));
      }
    } catch (e) {
      console.log(e);
    }
  }

  public async getWebhookInfo(): Promise<Result<string, ValidationException>> {
    try {
      const res: WebhookResponse = await this.axiosInstance.get(
        `/getWebhookInfo`,
      );

      if (res.data.ok) {
        return Result.ok(res.data.result.url || 'Webhook не назначен');
      } else {
        return Result.fail(new ValidationException(res.data.description));
      }
    } catch (e) {
      console.log(e);
    }
  }

  public async setWebhook(
    domain: string,
  ): Promise<Result<void, ValidationException>> {
    try {
      const res: WebhookResponse = await this.axiosInstance.get(
        `/setWebhook?url=${domain}/${routes.telegram.updates}`,
      );

      if (res.data.ok) {
        return Result.ok();
      } else {
        return Result.fail(new ValidationException(res.data.description));
      }
    } catch (e) {
      console.log(e);
    }
  }

  //methods
  deadlineIsApproaching(
    props: IDeadlineIsApproachingRequest,
  ): Promise<Result<void, ExceptionBase>> {
    return Promise.resolve(undefined);
  }

  async newOrderHasBeenAssigned(
    props: INewOrderHasBeenAssignedRequest,
  ): Promise<Result<void, ExceptionBase>> {
    const data: TelegramBotSendMessageData = {
      chat_id: props.tgId,
      text: `Назначена новая заявка ${props.orderNumber}`,
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Перейти к заявка',
              url:
                this.domain +
                '/admin/' +
                routes.order.root +
                `/${props.orderId}`,
            },
          ],
        ],
      },
    };

    const res = await this.sendMessage(data);

    if (!res.data.ok) {
      return Result.fail(
        new DomainException((res as SendMessageError).data.description),
      );
    }

    return Result.ok();
  }

  async newOrderHasBeenRegistered(
    props: INewOrderHasBeenRegisteredRequest,
  ): Promise<Result<void, ExceptionBase>> {
    const results: (SendMessageResponse | SendMessageError)[] = [];
    for (const tgId of props.tgIds) {
      const data: TelegramBotSendMessageData = {
        chat_id: tgId,
        text: `Зарегистрирована новая заявка ${props.orderNumber}`,
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Перейти к заявка',
                url:
                  this.domain +
                  '/admin/' +
                  routes.order.root +
                  `/${props.orderId}`,
              },
            ],
          ],
        },
      };

      const result = await this.sendMessage(data);
      results.push(result);
    }

    if (results.map((r) => r.data.ok).includes(false)) {
      const failResult = results.find((r) => !r.data.ok);
      return Result.fail(
        new DomainException((failResult as SendMessageError).data.description),
      );
    }

    return Result.ok();
  }

  async newTaskHasBeenAssigned(
    props: INewTaskHasBeenAssignedRequest,
  ): Promise<Result<void, ExceptionBase>> {
    const results: (SendMessageResponse | SendMessageError)[] = [];
    for (const tgId of props.tgIds) {
      const data: TelegramBotSendMessageData = {
        chat_id: tgId,
        text: `Назначена новая задача`,
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Перейти к задаче',
                url:
                  this.domain +
                  '/admin/' +
                  routes.task.root +
                  `/${props.taskId}`,
              },
            ],
          ],
        },
      };

      const result = await this.sendMessage(data);
      results.push(result);
    }

    if (results.map((r) => r.data.ok).includes(false)) {
      const failResult = results.find((r) => !r.data.ok);
      return Result.fail(
        new DomainException((failResult as SendMessageError).data.description),
      );
    }

    return Result.ok();
  }

  async sendWelcomeMessage(
    props: ISendWelcomeMessageRequest,
  ): Promise<Result<void, ExceptionBase>> {
    const data: TelegramBotSendMessageData = {
      chat_id: props.tgId,
      text: `Привет, ${props.firstname}. Я - бот и в этот чат буду присылать 
      тебе информацию о новых задачах, заявках и приближении дедлайнов. 
      Но не стоит всецело полагаться на меня, ведь всегда бывают сбои и баги, 
      самодисциплину никто не отменял`,
      parse_mode: 'HTML',
    };

    await this.sendMessage(data);

    return Result.ok();
  }

  async staffRegistered(
    props: IStaffRegisteredRequest,
  ): Promise<Result<void, ExceptionBase>> {
    const data: TelegramBotSendMessageData = {
      chat_id: props.tgId,
      text: `${props.staffName} зарегистрировался в системе. Теперь он может получать сообщения от бота`,
      parse_mode: 'HTML',
    };

    await this.sendMessage(data);

    return Result.ok();
  }

  async taskCreated(tgId: string): Promise<Result<void, ExceptionBase>> {
    const data: TelegramBotSendMessageData = {
      chat_id: tgId,
      text: `Информация о задаче была отправлена участникам`,
      parse_mode: 'HTML',
    };

    await this.sendMessage(data);

    return Result.ok();
  }

  async orderCreated(tgId: string): Promise<Result<void, ExceptionBase>> {
    const data: TelegramBotSendMessageData = {
      chat_id: tgId,
      text: `Информация о заявке была отправлена инженеру(-ам)`,
      parse_mode: 'HTML',
    };

    await this.sendMessage(data);

    return Result.ok();
  }
}
