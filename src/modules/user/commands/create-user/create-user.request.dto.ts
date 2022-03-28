import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsEnum, IsMobilePhone, IsOptional, IsString, IsUrl } from 'class-validator';
import { RoleType } from '@modules/user/types/role.type';

export class CreateUserRequestDto {
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
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsString()
  password: string;
  @ApiProperty()
  @IsEnum(RoleType)
  role: RoleType;
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
