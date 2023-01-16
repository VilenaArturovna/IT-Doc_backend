import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { IsNotJustSpaces } from '@src/common';

export class UpdateServiceRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotJustSpaces()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotJustSpaces()
  @IsNotEmpty()
  description?: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  cost: number;
}
