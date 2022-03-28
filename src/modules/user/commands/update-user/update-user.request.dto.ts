import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsMobilePhone,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class UpdateUserRequestDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  firstname: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  lastname: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  middleName: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsMobilePhone('ru-RU')
  phone: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  birthdate: Date;
  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  photo?: string;
}
