import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsMobilePhone,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class AcceptInviteRequestDto {
  @ApiProperty()
  @IsString()
  password: string;
  @ApiProperty()
  @IsString()
  firstname: string;
  @ApiProperty()
  @IsString()
  lastname: string;
  @ApiProperty()
  @IsString()
  middleName: string;
  @ApiProperty()
  @IsMobilePhone('ru-RU')
  phone: string;
  @ApiProperty()
  @IsDateString()
  birthdate: Date;
  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  photo?: string;
}
