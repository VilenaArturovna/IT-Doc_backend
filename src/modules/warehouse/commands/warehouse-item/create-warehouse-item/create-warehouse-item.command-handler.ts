import { CommandHandler } from '@nestjs/cqrs';
import { CreateWarehouseItemCommand } from './create-warehouse-item.command';
import {
  ProviderObjectionRepository,
  ServiceObjectionRepository,
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
    private readonly serviceObjectionRepository: ServiceObjectionRepository,
  ) {}

  async execute(
    command: CreateWarehouseItemCommand,
  ): Promise<Result<WarehouseItemEntity, ExceptionBase>> {
    const { vendorId, providerId, serviceId, ...payload } = command.payload;

    const [vendorResult, providerResult, serviceResult] = await Promise.all([
      this.vendorObjectionRepository.getOneById(new UuidVO(vendorId)),
      this.providerObjectionRepository.getOneById(new UuidVO(providerId)),
      serviceId &&
        this.serviceObjectionRepository.getOneById(new UuidVO(serviceId)),
    ]);

    const vendor = vendorResult.unwrap();
    const provider = providerResult.unwrap();
    let service;

    serviceResult && (service = serviceResult.unwrap());

    const warehouseItemEntity = WarehouseItemEntity.create({
      title: payload.title,
      unit: payload.unit,
      price: MoneyVO.toVO({ amount: payload.price, currency: Currency.RUR }),
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
      service,
    });

    return this.warehouseItemObjectionRepository.create(warehouseItemEntity);
  }
}
