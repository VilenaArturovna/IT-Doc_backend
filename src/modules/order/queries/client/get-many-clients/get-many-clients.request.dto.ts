import { PaginationWithSortingRequestDto } from '@libs/pagination';
import { Beneficiary, ClientType } from '@modules/order/types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotJustSpaces } from '@src/common';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum GetManyClientsSorting {
  name = 'name',
  type = 'type',
  beneficiary = 'beneficiary',
  fullName = 'fullName',
  INN = 'INN',
}

export class GetManyClientsRequestDto extends PaginationWithSortingRequestDto {
  @ApiPropertyOptional({
    description: 'Search by name, fullName, INN, directorName',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsNotJustSpaces()
  search?: string;

  @ApiPropertyOptional({
    enum: GetManyClientsSorting,
    enumName: 'GetManyClientsSorting',
  })
  @IsOptional()
  @IsEnum(GetManyClientsSorting)
  sort?: GetManyClientsSorting;

  @ApiPropertyOptional({
    enum: Beneficiary,
    enumName: 'Beneficiary',
  })
  @IsOptional()
  @IsEnum(Beneficiary)
  beneficiary?: Beneficiary;

  @ApiPropertyOptional({
    enum: ClientType,
    enumName: 'ClientType',
  })
  @IsOptional()
  @IsEnum(ClientType)
  type?: ClientType;
}
