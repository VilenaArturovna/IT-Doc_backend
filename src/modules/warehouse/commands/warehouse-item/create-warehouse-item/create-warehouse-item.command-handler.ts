import { CommandHandler } from '@nestjs/cqrs';
import { CreateWarehouseItemCommand } from './create-warehouse-item.command';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import { WarehouseItemEntity } from '@modules/warehouse/domain';
import { Currency, DateVO, MoneyVO, UuidVO } from '@libs/value-objects';
import { CommandHandlerBase } from '@libs/base-classes/command-handler.base';
import { WarehouseUnitOfWork } from '@modules/warehouse/database/unit-of-work';

@CommandHandler(CreateWarehouseItemCommand)
export class CreateWarehouseItemCommandHandler extends CommandHandlerBase<
  WarehouseUnitOfWork,
  WarehouseItemEntity
> {
  constructor(unitOfWork: WarehouseUnitOfWork) {
    super(unitOfWork);
  }

  async handle(
    command: CreateWarehouseItemCommand,
  ): Promise<Result<WarehouseItemEntity, ExceptionBase>> {
    const {
      trxId,
      payload: { vendorId, providerId, ...payload },
    } = command;

    const providerRepository = this.unitOfWork.getProviderRepository(trxId);
    const vendorRepository = this.unitOfWork.getVendorRepository(trxId);
    const warehouseItemRepository =
      this.unitOfWork.getWarehouseItemRepository(trxId);

    const [vendorResult, providerResult] = await Promise.all([
      vendorRepository.getOneById(new UuidVO(vendorId)),
      providerRepository.getOneById(new UuidVO(providerId)),
    ]);

    const vendor = vendorResult.unwrap();
    const provider = providerResult.unwrap();

    const warehouseItemEntity = WarehouseItemEntity.create({
      title: payload.title,
      unit: payload.unit,
      price: MoneyVO.toVO({ amount: payload.price, currency: Currency.RUB }),
      balance: payload.balance,
      criticalMargin: payload.criticalMargin,
      section: payload.section,
      nextDeliveryDate: payload.nextDeliveryDate
        ? new DateVO(payload.nextDeliveryDate)
        : undefined,
      compatibleModels: payload.compatibleModels,
      partNumber: payload.partNumber,
      packing: payload.packing,
      expense: payload.expense,
      expenseReserve: payload.expenseReserve,
      isArchived: false,
      vendor,
      provider,
    });

    return warehouseItemRepository.create(warehouseItemEntity);
  }
}
