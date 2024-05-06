import { StaffResponseDto } from '@modules/staff/dtos';
import { TaskEntity } from '@modules/task/domain';
import { TaskStatus } from '@modules/task/types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { TaskStaffResponseDto } from './task-staff.response.dto';

export class TaskResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  theme: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  number: string;

  @ApiProperty({ enum: TaskStatus, enumName: 'TaskStatus' })
  status: TaskStatus;

  @ApiProperty({ type: () => StaffResponseDto, isArray: true })
  participants: TaskStaffResponseDto[];

  @ApiPropertyOptional()
  price?: string;

  @ApiPropertyOptional()
  deadline?: string;

  constructor(entity: TaskEntity) {
    const props = entity.getCopiedProps();

    this.id = props.id.value;
    this.createdAt = props.createdAt.ISOString;
    this.deadline = props.deadline?.ISOString;
    this.theme = props.theme;
    this.description = props.description;
    this.number = props.number;
    this.status = props.status;
    this.participants = props.participants.map(
      (p) => new TaskStaffResponseDto(p),
    );
  }
}
