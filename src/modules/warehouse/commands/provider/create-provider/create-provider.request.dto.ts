import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsNotJustSpaces } from '@src/common';

export class CreateProviderRequestDto {
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
}
