import { Role } from '@modules/staff/types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateStaffRequestDto {
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

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  tgId: string;

  @ApiProperty({ example: '+79137773344' })
  @IsMobilePhone('ru-RU')
  phone: string;

  @ApiProperty()
  @IsEnum(Role)
  role: Role;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  birthdate?: string;
}
