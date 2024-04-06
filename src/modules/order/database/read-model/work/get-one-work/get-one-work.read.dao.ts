import { ExceptionBase, ReadDaoBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import { GetOneWorkQuery } from '@modules/order/queries';
import { ApiProperty } from '@nestjs/swagger';

export class GetOneWorkDaoModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  time: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: string;
}

export abstract class GetOneWorkReadDao extends ReadDaoBase<
  GetOneWorkDaoModel,
  GetOneWorkQuery
> {
  abstract query(
    query: GetOneWorkQuery,
  ): Promise<Result<GetOneWorkDaoModel, ExceptionBase>>;
}
