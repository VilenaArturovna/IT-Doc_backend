import { ExceptionBase, ReadDaoBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import { GetOneClientQuery } from '@modules/order/queries';
import { Beneficiary, ClientType } from '@modules/order/types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GetOneClientDaoModel {
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

  @ApiPropertyOptional({ nullable: true })
  fullName?: string;

  @ApiPropertyOptional({ nullable: true })
  legalAddress?: string;

  @ApiPropertyOptional({ nullable: true })
  actualAddress?: string;

  @ApiPropertyOptional({ nullable: true })
  INN?: string;

  @ApiPropertyOptional({ nullable: true })
  KPP?: string;

  @ApiPropertyOptional({ nullable: true })
  OGRN?: string;

  @ApiPropertyOptional({ nullable: true })
  BIK?: string;

  @ApiPropertyOptional({ nullable: true })
  paymentAccount?: string;

  @ApiPropertyOptional({ nullable: true })
  correspondentAccount?: string;

  @ApiPropertyOptional({ nullable: true })
  directorName?: string;

  @ApiPropertyOptional({ nullable: true })
  email?: string;

  @ApiPropertyOptional({ nullable: true })
  contactPerson?: string;

  @ApiPropertyOptional({ nullable: true })
  contactPersonPhone?: string;
}

export abstract class GetOneClientReadDao extends ReadDaoBase<
  GetOneClientDaoModel,
  GetOneClientQuery
> {
  abstract query(
    query: GetOneClientQuery,
  ): Promise<Result<GetOneClientDaoModel, ExceptionBase>>;
}
