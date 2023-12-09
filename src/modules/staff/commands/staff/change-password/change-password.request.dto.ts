import { passwordRegexp } from '@libs/utils';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

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
