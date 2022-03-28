import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetManyUsersRequestDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  filter: string;
}
