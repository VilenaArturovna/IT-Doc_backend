import { StaffEntity } from '@modules/staff/domain';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class StaffResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  @ApiProperty()
  firstname: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  middleName: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  phone: string;

  @ApiPropertyOptional({ nullable: true })
  birthdate?: string;

  @ApiPropertyOptional({ nullable: true })
  avatar?: string;

  constructor(entity: StaffEntity) {
    const props = entity.getCopiedProps();
    this.id = entity.id.value;
    this.updatedAt = entity.updatedAt.ISOString;
    this.createdAt = entity.createdAt.ISOString;
    this.firstname = props.firstname;
    this.lastname = props.lastname;
    this.middleName = props.middleName;
    this.birthdate = props.birthdate?.ISOString;
    this.avatar = props.avatar?.value;
    this.phone = props.phone.value;
    this.role = props.role;
  }
}
