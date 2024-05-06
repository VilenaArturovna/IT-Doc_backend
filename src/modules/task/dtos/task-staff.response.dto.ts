import { StaffResponseDto } from '@modules/staff/dtos';
import { TaskStaffEntity } from '@modules/task/domain';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TaskStaffResponseDto {
  @ApiPropertyOptional()
  comment?: string;

  @ApiProperty()
  isResponsible: boolean;

  @ApiProperty()
  isAuthor: boolean;

  @ApiProperty()
  isRead: boolean;

  @ApiProperty({ type: () => StaffResponseDto })
  staff: StaffResponseDto;

  constructor(entity: TaskStaffEntity) {
    const props = entity.getCopiedProps();

    this.isRead = props.isRead;
    this.isResponsible = props.isResponsible;
    this.isAuthor = props.isAuthor;
    this.comment = props.comment;
    this.staff = new StaffResponseDto(props.staff);
  }
}
