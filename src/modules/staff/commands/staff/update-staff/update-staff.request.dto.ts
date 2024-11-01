import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class UpdateStaffRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  middleName: string;

  @ApiProperty({ example: '+79137773344' })
  @IsMobilePhone('ru-RU')
  phone: string;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsDateString()
  birthdate?: string;

  @ApiPropertyOptional({ nullable: true })
  @IsUrl()
  @IsOptional()
  avatar?: string;
}
