import { ExceptionBase, ReadDaoBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import { GetOneOrderQuery } from '@modules/order/queries';
import { Beneficiary, OrderStatus, Priority } from '@modules/order/types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GetOneOrderStaff {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstname: string;

  @ApiProperty()
  lastname: string;
}

export class GetOneOrderWork {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: string;
}

export class GetOneOrderClient {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}

export class GetOneOrderRepairPart {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  cost: string;
}

export class GetOneOrderStage {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty({ enum: OrderStatus, enumName: 'OrderStatus' })
  status: OrderStatus;

  @ApiProperty()
  completedAt: string;

  @ApiPropertyOptional()
  deadline?: string;

  @ApiPropertyOptional()
  comment?: string;
}

export class GetOneOrderDaoModel {
  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  @ApiProperty({ enum: Priority, enumName: 'Priority' })
  priority: Priority;

  @ApiProperty({ enum: OrderStatus, enumName: 'OrderStatus' })
  status: OrderStatus;

  @ApiProperty()
  deadline: string;

  @ApiProperty()
  number: string;

  @ApiProperty()
  equipment: string;

  @ApiProperty()
  equipmentCondition: string;

  @ApiPropertyOptional()
  serialNumberEquipment?: string;

  @ApiProperty()
  malfunction: string;

  @ApiProperty({ enum: Beneficiary, enumName: 'Beneficiary' })
  beneficiary: Beneficiary;

  @ApiProperty()
  price: string;

  @ApiPropertyOptional({ type: () => GetOneOrderStaff })
  responsibleStaff?: GetOneOrderStaff;

  @ApiPropertyOptional({ type: () => GetOneOrderWork, isArray: true })
  works?: GetOneOrderWork[];

  @ApiProperty({ type: () => GetOneOrderClient })
  client: GetOneOrderClient;

  @ApiPropertyOptional({ type: () => GetOneOrderRepairPart, isArray: true })
  repairParts?: GetOneOrderRepairPart[];

  @ApiProperty({ type: () => GetOneOrderStage, isArray: true })
  stages: GetOneOrderStage[];
}

export abstract class GetOneOrderReadDao extends ReadDaoBase<
  GetOneOrderDaoModel,
  GetOneOrderQuery
> {
  abstract query(
    query: GetOneOrderQuery,
  ): Promise<Result<GetOneOrderDaoModel, ExceptionBase>>;
}
