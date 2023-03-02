import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Priority } from '@modules/order/types';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { IsNotJustSpaces } from '@src/common';

export class CreateOrderRequestDto {
  @ApiProperty({ enum: Priority, enumName: 'Priority' })
  @IsEnum(Priority)
  priority: Priority;

  @ApiProperty()
  @IsUUID()
  clientId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsNotJustSpaces()
  equipment: string; //оборудование

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsNotJustSpaces()
  equipmentCondition: string; //Состояние оборудования

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsNotJustSpaces()
  serialNumberEquipment?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsNotJustSpaces()
  malfunction: string; //неисправность

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  responsibleStaffId?: string;

  @ApiProperty()
  @IsBoolean()
  isRemoteOrder: boolean; //удаленный заказ
}
