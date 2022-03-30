import { IReadResponse } from '@lib/interfaces/read.response.interface';
import { UserEntity } from '@modules/user/user.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserResponseDto implements IReadResponse {
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  id: string;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  firstname: string;
  @ApiProperty()
  lastname: string;
  @ApiProperty()
  middleName: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  role: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  birthdate: Date;
  @ApiPropertyOptional()
  photo?: string;

  constructor(entity: UserEntity) {
    this.id = entity.id;
    this.updatedAt = entity.updatedAt;
    this.createdAt = entity.createdAt;
    this.email = entity.email;
    this.firstname = entity.firstname;
    this.lastname = entity.lastname;
    this.middleName = entity.middleName;
    this.birthdate = entity.birthdate;
    this.photo = entity?.photo;
    this.phone = entity.phone;
    this.role = entity.role;
  }
}
