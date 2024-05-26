import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class OrderReadyRequestDto {
  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsBoolean()
  refusalToRepair?: boolean;
}
