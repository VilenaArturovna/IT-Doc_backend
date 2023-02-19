import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { ClientType } from '@modules/order/types';
import { UpdateClientRequestDto } from '../update-client';

export class CreateClientRequestDto extends UpdateClientRequestDto {
  @ApiPropertyOptional({ enum: ClientType, enumName: 'ClientType' })
  @IsOptional()
  @IsEnum(ClientType)
  type?: ClientType;
}
