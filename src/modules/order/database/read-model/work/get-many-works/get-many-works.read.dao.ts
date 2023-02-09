import { ReadDaoBase, ExceptionBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import { ApiProperty } from '@nestjs/swagger';

import { GetManyWorksQuery } from '@modules/order/queries';
import { PaginationResponseDto } from '@libs/pagination';
import { GetOneWorkDaoModel } from '@modules/order/database/read-model';

export class GetManyWorksDaoModel extends PaginationResponseDto<GetOneWorkDaoModel> {
  @ApiProperty({ type: () => GetOneWorkDaoModel, isArray: true })
  data: GetOneWorkDaoModel[];
}

export abstract class GetManyWorksReadDao extends ReadDaoBase<
  GetManyWorksDaoModel,
  GetManyWorksQuery
> {
  abstract query(
    query: GetManyWorksQuery,
  ): Promise<Result<GetManyWorksDaoModel, ExceptionBase>>;
}
