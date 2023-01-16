import { StaffSignInDaoModel } from '@modules/staff/database/read-model';
import { ApiProperty } from '@nestjs/swagger';

export class StaffSignInResponseDto extends StaffSignInDaoModel {
  @ApiProperty()
  token: string;

  constructor(props: StaffSignInResponseDto) {
    super();
    this.id = props.id;
    this.role = props.role;
    this.token = props.token;
  }
}
