import { ClientEntity } from '@modules/order/domain';
import { Beneficiary, ClientType } from '@modules/order/types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export class ClientResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  phone: string;

  @ApiProperty({ enum: Beneficiary, enumName: 'Beneficiary' })
  @IsEnum(Beneficiary)
  beneficiary: Beneficiary;

  @ApiProperty({ enum: ClientType, enumName: 'ClientType' })
  @IsEnum(ClientType)
  type: ClientType;

  @ApiPropertyOptional({ nullable: true })
  fullName?: string;

  @ApiPropertyOptional({ nullable: true })
  legalAddress?: string;

  @ApiPropertyOptional({ nullable: true })
  actualAddress?: string;

  @ApiPropertyOptional({ nullable: true })
  INN?: string;

  @ApiPropertyOptional({ nullable: true })
  KPP?: string;

  @ApiPropertyOptional({ nullable: true })
  OGRN?: string;

  @ApiPropertyOptional({ nullable: true })
  BIK?: string;

  @ApiPropertyOptional({ nullable: true })
  paymentAccount?: string;

  @ApiPropertyOptional({ nullable: true })
  correspondentAccount?: string;

  @ApiPropertyOptional({ nullable: true })
  directorName?: string;

  @ApiPropertyOptional({ nullable: true })
  email?: string;

  @ApiPropertyOptional({ nullable: true })
  contactPerson?: string;

  @ApiPropertyOptional({ nullable: true })
  contactPersonPhone?: string;

  constructor(entity: ClientEntity) {
    const props = entity.getCopiedProps();

    this.id = props.id.value;
    this.name = props.name;
    this.phone = props.phone.value;
    this.beneficiary = props.beneficiary;
    this.type = props.type;
    this.fullName = props.fullName;
    this.legalAddress = props.legalAddress;
    this.actualAddress = props.actualAddress;
    this.INN = props.INN;
    this.KPP = props.KPP;
    this.OGRN = props.OGRN;
    this.BIK = props.BIK;
    this.paymentAccount = props.paymentAccount;
    this.correspondentAccount = props.correspondentAccount;
    this.directorName = props.directorName;
    this.email = props.email?.value;
    this.contactPerson = props.contactPerson;
    this.contactPersonPhone = props.contactPersonPhone?.value;
  }
}
