import { CommandHandler } from '@nestjs/cqrs';
import { UpdateWarehouseItemCommand } from './update-warehouse-item.command';
import {
  ProviderObjectionRepository,
  ServiceObjectionRepository,
  VendorObjectionRepository,
  WarehouseItemObjectionRepository,
} from '@modules/warehouse/database/repositories';
import { Result } from '@libs/utils';
import { ExceptionBase } from '@libs/base-classes';
import { Currency, DateVO, MoneyVO, UuidVO } from '@libs/value-objects';
import { WarehouseItemEntity } from '@modules/warehouse/domain';

@CommandHandler(UpdateWarehouseItemCommand)
export class UpdateWarehouseItemCommandHandler {
  constructor(
    private readonly warehouseItemObjectionRepository: WarehouseItemObjectionRepository,
    private readonly providerObjectionRepository: ProviderObjectionRepository,
    private readonly vendorObjectionRepository: VendorObjectionRepository,
    private readonly serviceObjectionRepository: ServiceObjectionRepository,
  ) {}

  async execute(
    command: UpdateWarehouseItemCommand,
  ): Promise<Result<WarehouseItemEntity, ExceptionBase>> {
    const { vendorId, providerId, serviceId, id, ...payload } = command.payload;

    const [warehouseItemResult, vendorResult, providerResult, serviceResult] =
      await Promise.all([
        this.warehouseItemObjectionRepository.getOneById(new UuidVO(id)),
        this.vendorObjectionRepository.getOneById(new UuidVO(vendorId)),
        this.providerObjectionRepository.getOneById(new UuidVO(providerId)),
        serviceId &&
          this.serviceObjectionRepository.getOneById(new UuidVO(serviceId)),
      ]);

    const warehouseItem = warehouseItemResult.unwrap();
    const vendor = vendorResult.unwrap();
    const provider = providerResult.unwrap();
    let service;

    serviceResult && (service = serviceResult.unwrap());

    warehouseItem.update({
      title: payload.title,
      price: MoneyVO.toVO({ amount: payload.price, currency: Currency.RUR }),
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
      service,
    });

    return this.warehouseItemObjectionRepository.update(warehouseItem);
  }
}