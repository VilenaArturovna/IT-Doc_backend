import { ReadDaoBase, ExceptionBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import { ApiProperty } from '@nestjs/swagger';

import { GetOneWorkQuery } from '@modules/order/queries';

export class GetOneWorkDaoModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  time: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;
}

export abstract class GetOneWorkReadDao extends ReadDaoBase<
  GetOneWorkDaoModel,
  GetOneWorkQuery
> {
  abstract query(
    query: GetOneWorkQuery,
  ): Promise<Result<GetOneWorkDaoModel, ExceptionBase>>;
}
