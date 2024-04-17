import { ExceptionBase, ReadDaoBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import { GetInfoAboutOrderForClientQuery } from '@modules/order/queries';
import { OrderStatus } from '@modules/order/types';
import { ApiProperty } from '@nestjs/swagger';

export class GetInfoAboutOrderForClientDaoModel {
  @ApiProperty()
  number: string;

  @ApiProperty({ enum: OrderStatus, enumName: 'OrderStatus' })
  status: OrderStatus;
}

export abstract class GetInfoAboutOrderForClientReadDao extends ReadDaoBase<
  GetInfoAboutOrderForClientDaoModel,
  GetInfoAboutOrderForClientQuery
> {
  abstract query(
    query: GetInfoAboutOrderForClientQuery,
  ): Promise<Result<GetInfoAboutOrderForClientDaoModel, ExceptionBase>>;
}
