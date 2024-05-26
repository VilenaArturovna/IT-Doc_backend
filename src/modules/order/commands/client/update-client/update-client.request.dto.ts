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

  @ApiPropertyOptional({
    enum: Beneficiary,
    enumName: 'Beneficiary',
    nullable: true,
  })
  @IsOptional()
  @IsEnum(Beneficiary)
  beneficiary?: Beneficiary;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsNotJustSpaces()
  fullName?: string;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsNotJustSpaces()
  legalAddress?: string;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsNotJustSpaces()
  actualAddress?: string;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsNotJustSpaces()
  INN?: string;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsNotJustSpaces()
  KPP?: string;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsNotJustSpaces()
  OGRN?: string;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsNotJustSpaces()
  BIK?: string;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsNotJustSpaces()
  paymentAccount?: string;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsNotJustSpaces()
  correspondentAccount?: string;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsNotJustSpaces()
  directorName?: string;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsNotJustSpaces()
  contactPerson?: string;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsPhoneNumber('RU')
  contactPersonPhone?: string;
}
