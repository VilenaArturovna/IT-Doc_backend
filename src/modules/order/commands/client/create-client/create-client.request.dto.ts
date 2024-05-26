import { ClientType } from '@modules/order/types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

import { UpdateClientRequestDto } from '../update-client';

export class CreateClientRequestDto extends UpdateClientRequestDto {
  @ApiPropertyOptional({
    enum: ClientType,
    enumName: 'ClientType',
    nullable: true,
  })
  @IsOptional()
  @IsEnum(ClientType)
  type?: ClientType;
}
