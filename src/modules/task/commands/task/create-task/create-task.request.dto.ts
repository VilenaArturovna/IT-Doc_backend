import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTaskRequestDto {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  theme: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  deadline?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  price?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  responsibleStaffId?: string;
}
