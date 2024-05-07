import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class AddCommentToTaskRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  comment: string;
}
