import { CommandHandler } from '@nestjs/cqrs';
import { OrderHasBeenDiagnosedCommand } from './order-has-been-diagnosed.command';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import { OrderEntity } from '@modules/order/domain';
import { Currency, DateVO, MoneyVO, UuidVO } from '@libs/value-objects';
import { OrderStatus } from '@modules/order/types';
import { CommandHandlerBase } from '@libs/base-classes/command-handler.base';
import { OrderUnitOfWork } from '@modules/order/database/unit-of-work';

@CommandHandler(OrderHasBeenDiagnosedCommand)
export class OrderHasBeenDiagnosedCommandHandler extends CommandHandlerBase<
  OrderUnitOfWork,
  OrderEntity
> {
  constructor(unitOfWork: OrderUnitOfWork) {
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

    const workResult = await workRepository.getOneById(
      new UuidVO(payload.workId),
    );
    const work = workResult.unwrap();

    let repairParts;

    if (payload.repairParts) {
      const warehouseItemsResult = await warehouseItemRepository.getManyByIds(
        payload.repairParts.map((part) => new UuidVO(part.warehouseItemId)),
      );

      //todo продолжить здесь
    }

    order.endDiagnostic({
      deadline,
      equipmentCondition: payload.equipmentCondition,
      work,
      price: payload.price
        ? new MoneyVO({ amount: payload.price, currency: Currency.RUB })
        : undefined,
    });

    return orderRepository.update(order);
  }
}