import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotJustSpaces } from '@src/common';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateVendorRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotJustSpaces()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotJustSpaces()
  @IsNotEmpty()
  description?: string;
}
