import { ExceptionBase, ReadDaoBase } from '@libs/base-classes';
import { PaginationResponseDto } from '@libs/pagination';
import { Result } from '@libs/utils';
import { GetManyTasksQuery } from '@modules/task/queries';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GetManyTasksItem {
  @ApiProperty()
  id: string;

  @ApiProperty()
  number: string;

  @ApiProperty()
  theme: string;

  @ApiPropertyOptional()
  deadline: string;

  @ApiProperty()
  isRead: boolean;
}

export class GetManyTasksDaoModel extends PaginationResponseDto<GetManyTasksItem> {
  @ApiProperty({ type: () => GetManyTasksItem, isArray: true })
  data: GetManyTasksItem[];
}

export abstract class GetManyTasksReadDao extends ReadDaoBase<
  GetManyTasksDaoModel,
  GetManyTasksQuery
> {
  abstract query(
    query: GetManyTasksQuery,
  ): Promise<Result<GetManyTasksDaoModel, ExceptionBase>>;
}
