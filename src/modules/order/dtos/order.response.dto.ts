import { OrderEntity } from '@modules/order/domain';
import { ClientResponseDto } from '@modules/order/dtos/client.response.dto';
import { OrderStageResponseDto } from '@modules/order/dtos/order-stage.response.dto';
import { OrderWarehouseItemResponseDto } from '@modules/order/dtos/order-warehouse-item.response.dto';
import { WorkResponseDto } from '@modules/order/dtos/work.response.dto';
import { Beneficiary, OrderStatus, Priority } from '@modules/order/types';
import { StaffResponseDto } from '@modules/staff/dtos';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OrderResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  @ApiProperty({ enum: Priority, enumName: 'Priority' })
  priority: Priority;

  @ApiProperty({ enum: OrderStatus, enumName: 'OrderStatus' })
  status: OrderStatus;

  @ApiProperty()
  deadline: string;

  @ApiProperty()
  number: string;

  @ApiPropertyOptional({ type: () => StaffResponseDto, nullable: true })
  responsibleStaff?: StaffResponseDto;

  @ApiProperty()
  equipment: string;

  @ApiProperty()
  equipmentCondition: string;

  @ApiPropertyOptional()
  serialNumberEquipment?: string;

  @ApiProperty()
  malfunction: string;

  @ApiPropertyOptional({
    type: () => WorkResponseDto,
    isArray: true,
    nullable: true,
  })
  works?: WorkResponseDto[];

  @ApiProperty({ type: () => ClientResponseDto })
  client: ClientResponseDto;

  @ApiProperty({ enum: Beneficiary, enumName: 'Beneficiary' })
  beneficiary: Beneficiary;

  @ApiProperty()
  price: string;

  @ApiPropertyOptional({
    type: () => OrderWarehouseItemResponseDto,
    isArray: true,
    nullable: true,
  })
  repairParts?: OrderWarehouseItemResponseDto[];

  @ApiProperty({ type: () => OrderStageResponseDto, isArray: true })
  stages: OrderStageResponseDto[];

  @ApiProperty()
  isPaid: boolean;

  @ApiPropertyOptional()
  refusalToRepair?: boolean;

  constructor(entity: OrderEntity) {
    const props = entity.getCopiedProps();

    this.id = props.id.value;
    this.createdAt = props.createdAt.ISOString;
    this.updatedAt = props.updatedAt.ISOString;
    this.priority = props.priority;
    this.status = props.status;
    this.deadline = props.deadline.ISOString;
    this.number = props.number;
    this.responsibleStaff = props.responsibleStaff
      ? new StaffResponseDto(props.responsibleStaff)
      : undefined;
    this.equipment = props.equipment;
    this.equipmentCondition = props.equipmentCondition;
    this.serialNumberEquipment = props.serialNumberEquipment;
    this.malfunction = props.malfunction;
    this.works = props.works
      ? props.works.map((work) => new WorkResponseDto(work))
      : undefined;
    this.client = new ClientResponseDto(props.client);
    this.beneficiary = props.beneficiary;
    this.price = props.price.amount;
    this.repairParts = props.repairParts
      ? props.repairParts.map((vo) => new OrderWarehouseItemResponseDto(vo))
      : undefined;
    this.stages = props.stages.map((stage) => new OrderStageResponseDto(stage));
    this.isPaid = props.isPaid;
    this.refusalToRepair = props.refusalToRepair;
  }
}
