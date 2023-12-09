import { passwordRegexp } from '@libs/utils';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches } from 'class-validator';

export class StaffSignInRequestDto {
  @ApiProperty({ example: 'admin@itdoc.ru' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'qweQWE123$' })
  @IsString()
  @Matches(passwordRegexp, {
    message:
      'Пароль должен содержать минимум одну прописную букву, одну строчную букву, один спецсимвол и одну цифру. Длина пароля от 8 до 20 символов',
  })
  password: string;
}
