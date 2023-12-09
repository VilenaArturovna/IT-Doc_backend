import { Beneficiary } from '@modules/order/types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotJustSpaces } from '@src/common';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class UpdateClientRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsNotJustSpaces()
  name: string;

  @ApiProperty()
  @IsPhoneNumber('RU')
  phone: string;

  @ApiPropertyOptional({ enum: Beneficiary, enumName: 'Beneficiary' })
  @IsOptional()
  @IsEnum(Beneficiary)
  beneficiary?: Beneficiary;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsNotJustSpaces()
  fullName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsNotJustSpaces()
  legalAddress?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsNotJustSpaces()
  actualAddress?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsNotJustSpaces()
  INN?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsNotJustSpaces()
  KPP?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsNotJustSpaces()
  OGRN?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsNotJustSpaces()
  BIK?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsNotJustSpaces()
  paymentAccount?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsNotJustSpaces()
  correspondentAccount?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsNotJustSpaces()
  directorName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsNotJustSpaces()
  contactPerson?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsPhoneNumber('RU')
  contactPersonPhone?: string;
}
