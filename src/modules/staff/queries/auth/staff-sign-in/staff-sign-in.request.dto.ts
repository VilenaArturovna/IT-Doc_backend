import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches } from 'class-validator';
import { passwordRegexp } from '@libs/utils';

export class StaffSignInRequestDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @Matches(passwordRegexp, {
    message:
      'Пароль должен содержать минимум одну прописную букву, одну строчную букву, один спецсимвол и одну цифру. Длина пароля от 8 до 20 символов',
  })
  password: string;
}
