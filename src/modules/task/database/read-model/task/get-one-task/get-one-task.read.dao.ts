import { ExceptionBase, ReadDaoBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import { GetOneTaskQuery } from '@modules/task/queries';
import { TaskStatus } from '@modules/task/types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GetOneTaskStaff {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstname: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  middleName: string;

  @ApiProperty()
  role: string;

  @ApiPropertyOptional({ nullable: true })
  avatar?: string;
}

export class GetOneTaskParticipant {
  @ApiPropertyOptional({ nullable: true })
  comment?: string;

  @ApiProperty()
  isResponsible: boolean;

  @ApiProperty()
  isAuthor: boolean;

  @ApiProperty()
  isRead: boolean;

  @ApiProperty({ type: () => GetOneTaskStaff })
  staff: GetOneTaskStaff;
}

export class GetOneTaskDaoModel {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  @ApiProperty()
  theme: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  number: string;

  @ApiProperty({ enum: TaskStatus, enumName: 'TaskStatus' })
  status: TaskStatus;

  @ApiProperty({ type: () => GetOneTaskParticipant, isArray: true })
  participants: GetOneTaskParticipant[];

  @ApiPropertyOptional({ nullable: true })
  price?: string;

  @ApiPropertyOptional({ nullable: true })
  deadline?: string;
}

export abstract class GetOneTaskReadDao extends ReadDaoBase<
  GetOneTaskDaoModel,
  GetOneTaskQuery
> {
  abstract query(
    query: GetOneTaskQuery,
  ): Promise<Result<GetOneTaskDaoModel, ExceptionBase>>;
}
