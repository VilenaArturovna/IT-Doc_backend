import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { IsNotJustSpaces } from '@src/common';
import { Type } from 'class-transformer';

export class RepairPartResponseDto {
  @ApiProperty()
  @IsUUID()
  warehouseItemId: string;

  @ApiProperty()
  @IsPositive()
  @IsInt()
  quantity: number;
}

export class OrderHasBeenDiagnosedRequestDto {
  @ApiProperty()
  @IsUUID()
  workId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsNotJustSpaces()
  equipmentCondition: string;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiPropertyOptional({
    type: () => RepairPartResponseDto,
    isArray: true,
    nullable: true,
  })
  @IsOptional()
  @Type(() => RepairPartResponseDto)
  @ValidateNested({ each: true })
  repairParts?: RepairPartResponseDto[];
}
