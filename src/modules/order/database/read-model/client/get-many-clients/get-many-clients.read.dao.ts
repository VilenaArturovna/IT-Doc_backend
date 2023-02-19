import { ReadDaoBase, ExceptionBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import { ApiProperty } from '@nestjs/swagger';

import { GetManyClientsQuery } from '@modules/order/queries';
import { Beneficiary, ClientType } from '@modules/order/types';
import { PaginationResponseDto } from '@libs/pagination';

export class GetManyClientsItem {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  phone: string;

  @ApiProperty({ enum: Beneficiary, enumName: 'Beneficiary' })
  beneficiary: Beneficiary;

  @ApiProperty({ enum: ClientType, enumName: 'ClientType' })
  type: ClientType;
}

export class GetManyClientsDaoModel extends PaginationResponseDto<GetManyClientsItem> {
  @ApiProperty({ type: () => GetManyClientsItem, isArray: true })
  data: GetManyClientsItem[];
}

export abstract class GetManyClientsReadDao extends ReadDaoBase<
  GetManyClientsDaoModel,
  GetManyClientsQuery
> {
  abstract query(
    query: GetManyClientsQuery,
  ): Promise<Result<GetManyClientsDaoModel, ExceptionBase>>;
}
