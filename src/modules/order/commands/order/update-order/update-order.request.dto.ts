import { Beneficiary } from '@modules/order/types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDefined,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class UpdateOrderRequestDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isPaid?: boolean;

  @ApiPropertyOptional({ enum: Beneficiary, enumName: 'Beneficiary' })
  @IsOptional()
  @IsEnum(Beneficiary)
  beneficiary?: Beneficiary;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  price?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  responsibleStaffId?: string;

  @ApiPropertyOptional({ description: 'in minutes' })
  @IsOptional()
  @IsInt()
  @IsPositive()
  deadline?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ValidateIf((object: UpdateOrderRequestDto) => Boolean(object.deadline))
  comment?: string;
}
