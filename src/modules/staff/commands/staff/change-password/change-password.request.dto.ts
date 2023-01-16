import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';
import { passwordRegexp } from '@libs/utils';

export class ChangePasswordRequestDto {
  @ApiProperty()
  @IsString()
  oldPassword: string;

  @ApiProperty()
  @IsString()
  @Matches(passwordRegexp, {
    message:
      'Пароль должен содержать минимум одну прописную букву, одну строчную букву, один спецсимвол и одну цифру. Длина пароля от 8 до 20 символов',
  })
  newPassword: string;
}
