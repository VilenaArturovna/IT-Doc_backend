import { ExceptionBase, ReadDaoBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { GetOneWarehouseItemQuery } from '@modules/warehouse/queries';
import { Section, Unit } from '@modules/warehouse/types';

export class GetOneWarehouseItemVendor {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}

export class GetOneWarehouseItemDaoModel {
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

  @ApiProperty({ type: () => GetOneWarehouseItemVendor })
  vendor: GetOneWarehouseItemVendor;

  @ApiProperty({ type: () => GetOneWarehouseItemVendor })
  provider: GetOneWarehouseItemVendor;

  @ApiPropertyOptional({
    type: () => GetOneWarehouseItemVendor,
    nullable: true,
  })
  service?: GetOneWarehouseItemVendor;

  @ApiProperty()
  isArchived: boolean;
}

export abstract class GetOneWarehouseItemReadDao extends ReadDaoBase<
  GetOneWarehouseItemDaoModel,
  GetOneWarehouseItemQuery
> {
  abstract query(
    query: GetOneWarehouseItemQuery,
  ): Promise<Result<GetOneWarehouseItemDaoModel, ExceptionBase>>;
}
