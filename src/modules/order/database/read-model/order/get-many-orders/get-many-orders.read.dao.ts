import { ExceptionBase, ReadDaoBase } from '@libs/base-classes';
import { PaginationResponseDto } from '@libs/pagination';
import { Result } from '@libs/utils';
import {
  GetOneOrderClient,
  GetOneOrderStaff,
  GetOneOrderStage,
} from '@modules/order/database/read-model';
import { GetManyOrdersQuery } from '@modules/order/queries';
import { Beneficiary, OrderStatus, Priority } from '@modules/order/types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GetManyOrdersItem {
  @ApiProperty()
  id: string;

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

  @ApiProperty()
  isPaid: boolean;

  @ApiProperty({ type: () => GetOneOrderStage, isArray: true })
  stages: GetOneOrderStage[];

  @ApiProperty({ type: () => GetOneOrderClient })
  client: GetOneOrderClient;

  @ApiPropertyOptional({ type: () => GetOneOrderStaff })
  responsibleStaff?: GetOneOrderStaff;
}
export class GetManyOrdersDaoModel extends PaginationResponseDto<GetManyOrdersItem> {
  @ApiProperty({ type: () => GetManyOrdersItem, isArray: true })
  data: GetManyOrdersItem[];
}

export abstract class GetManyOrdersReadDao extends ReadDaoBase<
  GetManyOrdersDaoModel,
  GetManyOrdersQuery
> {
  abstract query(
    query: GetManyOrdersQuery,
  ): Promise<Result<GetManyOrdersDaoModel, ExceptionBase>>;
}
