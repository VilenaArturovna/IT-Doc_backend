import { Knex } from 'knex';
import { ExceptionBase } from '../base-classes';
import { ConflictException } from '../exceptions';
import { Result } from '../utils';
import { PaginationResponseDto } from './pagination.response.dto';

export const paginate = async <T>(options: {
  qb: Knex.QueryBuilder;
  limit: number;
  page: number;
  isGrouped: boolean;
}): Promise<Result<PaginationResponseDto<T>, ExceptionBase>> => {
  const { page, limit, isGrouped, qb } = options;

  const counts = await qb.clone().clearSelect().count().first();

  const countsArray = await qb.clone().clearSelect().count();

  const total = isGrouped ? countsArray.length : Number(counts?.count || 0);
  const pageCount = Math.ceil(total / limit) || 1;
  const pageOffset = Math.floor(page * limit - limit);

  if (page > pageCount) {
    return Result.fail(new ConflictException(`Count of pages is ${pageCount}`));
  }

  const data = await qb.limit(limit).offset(pageOffset);

  return Result.ok({
    data,
    page: Number(page),
    limit: Number(limit),
    total,
  });
};
