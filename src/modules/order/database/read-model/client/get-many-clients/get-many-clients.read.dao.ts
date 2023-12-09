import { ExceptionBase, ReadDaoBase } from '@libs/base-classes';
import { PaginationResponseDto } from '@libs/pagination';
import { Result } from '@libs/utils';
import { GetManyClientsQuery } from '@modules/order/queries';
import { Beneficiary, ClientType } from '@modules/order/types';
import { ApiProperty } from '@nestjs/swagger';

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
