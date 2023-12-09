import {
  ProviderOrmEntity,
  VendorOrmEntity,
} from '@modules/warehouse/database/entities';
import { WarehouseItemEntity } from '@modules/warehouse/domain';
import { ProviderResponseDto } from '@modules/warehouse/dtos/provider.response.dto';
import { VendorResponseDto } from '@modules/warehouse/dtos/vendor.response.dto';
import { Section, Unit } from '@modules/warehouse/types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class WarehouseItemResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ enum: Section, enumName: 'Section' })
  section: Section;

  @ApiPropertyOptional()
  partNumber?: string;

  @ApiProperty()
  title: string;

  @ApiPropertyOptional()
  compatibleModels?: string;

  @ApiProperty({ enum: Unit, enumName: 'Unit' })
  unit: Unit;

  @ApiPropertyOptional()
  packing?: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  balance: number;

  @ApiPropertyOptional()
  expense?: number;

  @ApiPropertyOptional()
  expenseReserve?: number;

  @ApiProperty()
  criticalMargin: number;

  @ApiPropertyOptional()
  nextDeliveryDate?: string;

  @ApiProperty({ type: () => VendorOrmEntity })
  vendor: VendorOrmEntity;

  @ApiProperty({ type: () => ProviderOrmEntity })
  provider: ProviderOrmEntity;

  @ApiProperty()
  isArchived: boolean;

  constructor(entity: WarehouseItemEntity) {
    const props = entity.getCopiedProps();
    this.id = props.id.value;
    this.title = props.title;
    this.compatibleModels = props.compatibleModels;
    this.section = props.section;
    this.partNumber = props.partNumber;
    this.price = props.price.amount;
    this.balance = props.balance;
    this.expense = props.expense;
    this.expenseReserve = props.expenseReserve;
    this.nextDeliveryDate = props.nextDeliveryDate
      ? props.nextDeliveryDate.ISOString
      : undefined;
    this.criticalMargin = props.criticalMargin;
    this.unit = props.unit;
    this.packing = props.packing;
    this.provider = new ProviderResponseDto(props.provider);
    this.vendor = new VendorResponseDto(props.vendor);
    this.isArchived = props.isArchived;
  }
}
