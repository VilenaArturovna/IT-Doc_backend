import { OrderUnitOfWork } from '@modules/order/database/unit-of-work';
import {
  IDeadlineIsApproachingRequest,
  TelegramBotService,
} from '@modules/telegram/service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class InformAboutApproachingDeadlineCronService {
  constructor(
    private readonly unitOfWork: OrderUnitOfWork,
    private readonly configService: ConfigService,
    private readonly telegramBotService: TelegramBotService,
  ) {}

  @Cron(CronExpression.EVERY_30_MINUTES)
  async handle() {
    const trxId = await this.unitOfWork.start();
    const orderRepository = this.unitOfWork.getOrderRepository(trxId);

    const minutesBeforeDeadline = this.configService.get<number>(
      'minutesBeforeDeadline',
    );
    const adminTgId = this.configService.get<string>('adminTgId');

    const ordersResult = await orderRepository.getManyFinishingOrders(
      minutesBeforeDeadline,
    );
    const orders = ordersResult.unwrap();

    for (const order of orders) {
      if (order.responsibleStaff) {
        const requestData: IDeadlineIsApproachingRequest = {
          orderId: order.id.value,
          orderNumber: order.number,
          deadline: order.deadline,
          tgId: order.responsibleStaff.tgId,
          isCopy: false,
        };

        const res = await this.telegramBotService.deadlineIsApproaching(
          requestData,
        );

        if (!res.isErr) {
          await this.telegramBotService.deadlineIsApproaching({
            ...requestData,
            tgId: adminTgId,
            isCopy: true,
          });
        }
      } else {
        await this.telegramBotService.deadlineIsApproachingWithoutResponsibleStaff(
          {
            orderId: order.id.value,
            orderNumber: order.number,
            deadline: order.deadline,
            tgId: adminTgId,
          },
        );
      }
    }

    await this.unitOfWork.commit(trxId);
  }
}
