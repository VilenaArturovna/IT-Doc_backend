import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { IsNotJustSpaces } from '@src/common';
import { passwordRegexp } from '@libs/utils';

export class ForgotPasswordRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsNotJustSpaces()
  resetPasswordHash: string;

  @ApiProperty()
  @IsString()
  @Matches(passwordRegexp, {
    message:
      'Пароль должен содержать минимум одну прописную букву, одну строчную букву, один спецсимвол и одну цифру. Длина пароля от 8 до 20 символов',
  })
  password: string;
}
