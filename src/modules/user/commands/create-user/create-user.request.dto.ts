import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum } from 'class-validator';
import { RoleType } from '@modules/user/types/role.type';

export class CreateUserRequestDto {
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsEnum(RoleType)
  role: RoleType;
}
