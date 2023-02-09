import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Section, Unit } from '@modules/warehouse/types';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateWarehouseItemRequestDto {
  @ApiProperty({ enum: Section, enumName: 'Section' })
  @IsEnum(Section)
  section: Section;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  partNumber?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  compatibleModels?: string;

  @ApiProperty({ enum: Unit, enumName: 'Unit' })
  @IsEnum(Unit)
  unit: Unit;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  packing?: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  balance: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @IsPositive()
  expense?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @IsPositive()
  expenseReserve?: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  criticalMargin: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  nextDeliveryDate?: string;

  @ApiProperty()
  @IsUUID()
  vendorId: string;

  @ApiProperty()
  @IsUUID()
  providerId: string;
}
