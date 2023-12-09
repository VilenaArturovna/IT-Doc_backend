import { ExceptionBase, ReadDaoBase } from '@libs/base-classes';
import { PaginationResponseDto } from '@libs/pagination';
import { Result } from '@libs/utils';
import { GetOneWorkDaoModel } from '@modules/order/database/read-model';
import { GetManyWorksQuery } from '@modules/order/queries';
import { ApiProperty } from '@nestjs/swagger';

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
