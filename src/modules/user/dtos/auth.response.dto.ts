import { UserResponseDto } from '@modules/user/dtos/user.response.dto';
import { UserEntity } from '@modules/user/user.entity';

export class AuthResponseDto extends UserResponseDto {
  token: string;

  constructor(response: UserEntity & { token: string }) {
    super(response);
    this.token = response.token;
  }
}
