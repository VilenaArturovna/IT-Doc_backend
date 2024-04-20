import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class OrderReadyRequestDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  refusalToRepair?: boolean;
}
