import { ValidationException } from '@libs/exceptions';
import { routes } from '@libs/routes';
import { Result } from '@libs/utils';
import {
  IDeadlineIsApproachingRequest,
  INewOrderHasBeenAssignedRequest,
  INewTaskHasBeenAssignedRequest,
  ISendWelcomeMessageRequest,
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
  ): Promise<SendMessageResponse> {
    try {
      return await this.axiosInstance.post('/sendMessage', data);
    } catch (e) {
      console.log('telegram send message', e);
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
  ): Promise<Result<void, ValidationException>> {
    return Promise.resolve(undefined);
  }

  async newOrderHasBeenAssigned(
    props: INewOrderHasBeenAssignedRequest,
  ): Promise<Result<void, ValidationException>> {
    const data: TelegramBotSendMessageData = {
      chat_id: props.tgId,
      text: `Назначена новая заявка ${props.orderNumber}`,
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Перейти к задаче',
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

    await this.sendMessage(data);

    return Result.ok();
  }

  async newTaskHasBeenAssigned(
    props: INewTaskHasBeenAssignedRequest,
  ): Promise<Result<void, ValidationException>> {
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

      await this.sendMessage(data);
    }

    return Result.ok();
  }

  async sendWelcomeMessage(
    props: ISendWelcomeMessageRequest,
  ): Promise<Result<void, ValidationException>> {
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
}
