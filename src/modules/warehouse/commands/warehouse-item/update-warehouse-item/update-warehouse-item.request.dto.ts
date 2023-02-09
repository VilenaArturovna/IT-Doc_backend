import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateWarehouseItemRequestDto {
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
