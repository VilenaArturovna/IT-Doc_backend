import { CommandHandler } from '@nestjs/cqrs';
import { CreateWarehouseItemCommand } from './create-warehouse-item.command';
import {
  ProviderObjectionRepository,
  VendorObjectionRepository,
  WarehouseItemObjectionRepository,
} from '@modules/warehouse/database/repositories';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import { WarehouseItemEntity } from '@modules/warehouse/domain';
import { Currency, DateVO, MoneyVO, UuidVO } from '@libs/value-objects';

@CommandHandler(CreateWarehouseItemCommand)
export class CreateWarehouseItemCommandHandler {
  constructor(
    private readonly warehouseItemObjectionRepository: WarehouseItemObjectionRepository,
    private readonly providerObjectionRepository: ProviderObjectionRepository,
    private readonly vendorObjectionRepository: VendorObjectionRepository,
  ) {}

  async execute(
    command: CreateWarehouseItemCommand,
  ): Promise<Result<WarehouseItemEntity, ExceptionBase>> {
    const { vendorId, providerId, ...payload } = command.payload;

    const [vendorResult, providerResult] = await Promise.all([
      this.vendorObjectionRepository.getOneById(new UuidVO(vendorId)),
      this.providerObjectionRepository.getOneById(new UuidVO(providerId)),
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

    return this.warehouseItemObjectionRepository.create(warehouseItemEntity);
  }
}
