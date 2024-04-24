import { ExceptionBase } from '@libs/base-classes';
import { CommandHandlerBase } from '@libs/base-classes/command-handler.base';
import { ConflictException, NotFoundException } from '@libs/exceptions';
import { MoneyCalculator, Result } from '@libs/utils';
import { Currency, DateVO, UuidVO } from '@libs/value-objects';
import { OrderUnitOfWork } from '@modules/order/database/unit-of-work';
import { OrderEntity } from '@modules/order/domain';
import { RepairPartVO } from '@modules/order/domain/value-objects';
import { OrderStatus } from '@modules/order/types';
import { ConfigService } from '@nestjs/config';
import { CommandHandler } from '@nestjs/cqrs';

import { OrderHasBeenDiagnosedCommand } from './order-has-been-diagnosed.command';

@CommandHandler(OrderHasBeenDiagnosedCommand)
export class OrderHasBeenDiagnosedCommandHandler extends CommandHandlerBase<
  OrderUnitOfWork,
  OrderEntity
> {
  constructor(
    unitOfWork: OrderUnitOfWork,
    private readonly configService: ConfigService,
  ) {
    super(unitOfWork);
  }

  async handle(
    command: OrderHasBeenDiagnosedCommand,
  ): Promise<Result<OrderEntity, ExceptionBase>> {
    const {
      trxId,
      payload: { id, ...payload },
    } = command;

    const orderRepository = this.unitOfWork.getOrderRepository(trxId);
    const workRepository = this.unitOfWork.getWorkRepository(trxId);
    const warehouseItemRepository =
      this.unitOfWork.getWarehouseItemRepository(trxId);
    const deadlineRepository = this.unitOfWork.getDeadlineRepository(trxId);

    const orderResult = await orderRepository.getOneById(new UuidVO(id));
    const order = orderResult.unwrap();

    const deadlineEntityResult = await deadlineRepository.getOneByName(
      OrderStatus.DIAGNOSED,
    );
    const deadlineEntity = deadlineEntityResult.unwrap();

    const deadline = DateVO.now().addMinutes(
      deadlineEntity.getPriorityDeadline(order.priority),
    );

    const worksResult = await workRepository.getManyByIds(
      payload.worksIds.map((id) => new UuidVO(id)),
    );
    const works = worksResult.unwrap();

    const repairParts: RepairPartVO[] = [];

    if (payload.repairParts) {
      const warehouseItemsResult = await warehouseItemRepository.getManyByIds(
        payload.repairParts.map((part) => new UuidVO(part.warehouseItemId)),
      );

      const warehouseItems = warehouseItemsResult.unwrap();

      for (const repairPart of payload.repairParts) {
        const item = warehouseItems.find((i) =>
          i.id.equals(new UuidVO(repairPart.warehouseItemId)),
        );
        if (!item) return Result.fail(new NotFoundException('ЗИП не найден'));

        if (item.balance < repairPart.quantity) {
          return Result.fail(
            new ConflictException(`Не хватает на складе ${item.title}`),
          );
        }

        item.reserve(repairPart.quantity);

        const cost = new MoneyCalculator(Currency.RUB)
          .plus(item.price)
          .multiply(repairPart.quantity)
          .result();

        repairParts.push(
          new RepairPartVO({
            cost,
            warehouseItem: item,
            quantity: repairPart.quantity,
          }),
        );
      }

      //TODO check updating
      await warehouseItemRepository.batchUpdate(warehouseItems);
    }

    const margin = this.configService.get<number>('margin');

    order.endDiagnostic(
      {
        deadline,
        equipmentCondition: payload.equipmentCondition,
        works,
        repairParts,
      },
      margin,
    );

    return orderRepository.update(order);
  }
}
