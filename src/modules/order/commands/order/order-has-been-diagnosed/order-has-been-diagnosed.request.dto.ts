import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotJustSpaces } from '@src/common';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class RepairPartRequestDto {
  @ApiProperty()
  @IsUUID()
  warehouseItemId: string;

  @ApiProperty()
  @IsPositive()
  quantity: number;
}

export class OrderHasBeenDiagnosedRequestDto {
  @ApiProperty()
  @IsArray()
  @ArrayMinSize(1)
  @IsUUID('4', { each: true })
  worksIds: string[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsNotJustSpaces()
  equipmentCondition: string;

  @ApiPropertyOptional({
    type: () => RepairPartRequestDto,
    isArray: true,
    nullable: true,
  })
  @IsOptional()
  @Type(() => RepairPartRequestDto)
  @ValidateNested({ each: true })
  repairParts?: RepairPartRequestDto[];
}
