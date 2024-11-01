import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class GetSignedUrlRequestDto {
  @IsString()
  @IsDefined()
  @ApiProperty({ description: 'File name', example: 'file.txt' })
  fileName: string;
}
