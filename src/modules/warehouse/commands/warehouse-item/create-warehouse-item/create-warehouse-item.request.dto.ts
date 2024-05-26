import { Section, Unit } from '@modules/warehouse/types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  partNumber?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  compatibleModels?: string;

  @ApiProperty({ enum: Unit, enumName: 'Unit' })
  @IsEnum(Unit)
  unit: Unit;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  packing?: string;

  @ApiProperty()
  @IsString()
  price: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  balance: number;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  expense?: number;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  expenseReserve?: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  criticalMargin: number;

  @ApiPropertyOptional({ nullable: true })
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
