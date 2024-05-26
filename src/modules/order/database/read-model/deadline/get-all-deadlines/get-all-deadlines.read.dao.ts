import { ExceptionBase, ReadDaoBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import { GetAllDeadlinesQuery } from '@modules/order/queries';
import { OrderStatus } from '@modules/order/types';
import { ApiProperty } from '@nestjs/swagger';

export class GetAllDeadlinesDaoModel {
  @ApiProperty()
  id: string;

  @ApiProperty({ enum: OrderStatus, enumName: 'OrderStatus' })
  name: OrderStatus;

  @ApiProperty()
  normal: number;

  @ApiProperty()
  urgent: number;
}

export abstract class GetAllDeadlinesReadDao extends ReadDaoBase<
  GetAllDeadlinesDaoModel[],
  GetAllDeadlinesQuery
> {
  abstract query(
    query: GetAllDeadlinesQuery,
  ): Promise<Result<GetAllDeadlinesDaoModel[], ExceptionBase>>;
}
