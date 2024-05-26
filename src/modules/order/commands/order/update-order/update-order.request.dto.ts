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
  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isPaid?: boolean;

  @ApiPropertyOptional({
    enum: Beneficiary,
    enumName: 'Beneficiary',
    nullable: true,
  })
  @IsOptional()
  @IsEnum(Beneficiary)
  beneficiary?: Beneficiary;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  price?: string;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsUUID()
  responsibleStaffId?: string;

  @ApiPropertyOptional({ description: 'in minutes', nullable: true })
  @IsOptional()
  @IsInt()
  @IsPositive()
  deadline?: number;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ValidateIf((object: UpdateOrderRequestDto) => Boolean(object.deadline))
  comment?: string;
}
