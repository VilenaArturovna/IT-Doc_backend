import { ExceptionBase } from '@libs/base-classes';
import { CommandHandlerBase } from '@libs/base-classes/command-handler.base';
import { Result } from '@libs/utils';
import { DateVO, MoneyVO, UuidVO } from '@libs/value-objects';
import { WarehouseUnitOfWork } from '@modules/warehouse/database/unit-of-work';
import { WarehouseItemEntity } from '@modules/warehouse/domain';
import { CommandHandler } from '@nestjs/cqrs';

import { UpdateWarehouseItemCommand } from './update-warehouse-item.command';

@CommandHandler(UpdateWarehouseItemCommand)
export class UpdateWarehouseItemCommandHandler extends CommandHandlerBase<
  WarehouseUnitOfWork,
  WarehouseItemEntity
> {
  constructor(unitOfWork: WarehouseUnitOfWork) {
    super(unitOfWork);
  }

  async handle(
    command: UpdateWarehouseItemCommand,
  ): Promise<Result<WarehouseItemEntity, ExceptionBase>> {
    const {
      trxId,
      payload: { id, vendorId, providerId, ...payload },
    } = command;

    const providerRepository = this.unitOfWork.getProviderRepository(trxId);
    const vendorRepository = this.unitOfWork.getVendorRepository(trxId);
    const warehouseItemRepository =
      this.unitOfWork.getWarehouseItemRepository(trxId);

    const [warehouseItemResult, vendorResult, providerResult] =
      await Promise.all([
        warehouseItemRepository.getOneById(new UuidVO(id)),
        vendorRepository.getOneById(new UuidVO(vendorId)),
        providerRepository.getOneById(new UuidVO(providerId)),
      ]);

    const warehouseItem = warehouseItemResult.unwrap();

    const vendor = vendorResult.unwrap();
    const provider = providerResult.unwrap();

    warehouseItem.update({
      title: payload.title,
      price: MoneyVO.toVO({ amount: payload.price }),
      balance: payload.balance,
      criticalMargin: payload.criticalMargin,
      nextDeliveryDate: payload.nextDeliveryDate
        ? new DateVO(payload.nextDeliveryDate)
        : undefined,
      compatibleModels: payload.compatibleModels,
      partNumber: payload.partNumber,
      packing: payload.packing,
      expense: payload.expense,
      expenseReserve: payload.expenseReserve,
      vendor,
      provider,
    });

    return warehouseItemRepository.update(warehouseItem);
  }
}
