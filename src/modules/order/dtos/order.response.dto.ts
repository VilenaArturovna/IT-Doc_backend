import { OrderEntity } from '@modules/order/domain';
import { Beneficiary, OrderStatus, Priority } from '@modules/order/types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OrderResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  number: string;

  @ApiProperty({ enum: Priority, enumName: 'Priority' })
  priority: Priority;

  @ApiProperty({ enum: OrderStatus, enumName: 'OrderStatus' })
  status: OrderStatus;

  @ApiProperty()
  clientId: string;

  @ApiPropertyOptional()
  responsibleStaffId?: string;

  @ApiProperty()
  equipment: string;

  @ApiProperty()
  equipmentCondition: string;

  @ApiProperty()
  malfunction: string;

  @ApiPropertyOptional()
  serialNumberEquipment?: string;

  @ApiProperty({ enum: Beneficiary, enumName: 'Beneficiary' })
  beneficiary: Beneficiary;

  @ApiProperty()
  deadline: string;

  @ApiProperty()
  price: string;

  constructor(entity: OrderEntity) {
    const props = entity.getCopiedProps();

    this.id = props.id.value;
    this.priority = props.priority;
    this.status = props.status;
    this.number = props.number;
    this.clientId = props.client.id.value;
    this.responsibleStaffId = props.responsibleStaff?.id.value;
    this.equipment = props.equipment;
    this.equipmentCondition = props.equipmentCondition;
    this.serialNumberEquipment = props.serialNumberEquipment;
    this.malfunction = props.malfunction;
    this.beneficiary = props.beneficiary;
    this.deadline = props.deadline.ISOString;
    this.price = props.price.amount;
  }
}
