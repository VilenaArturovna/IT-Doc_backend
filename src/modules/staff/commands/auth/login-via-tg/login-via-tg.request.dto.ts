import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class LoginViaTgRequestDto {
  @ApiProperty()
  @IsNumber()
  auth_date: number;

  @ApiProperty()
  @IsString()
  first_name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  last_name?: string;

  @ApiProperty()
  @IsString()
  hash: string;

  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  photo_url?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  username?: string;
}
