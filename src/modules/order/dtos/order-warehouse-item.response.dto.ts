import { RepairPartVO } from '@modules/order/domain/value-objects';
import { WarehouseItemResponseDto } from '@modules/warehouse/dtos';
import { ApiProperty } from '@nestjs/swagger';

export class OrderWarehouseItemResponseDto {
  @ApiProperty()
  quantity: number;

  @ApiProperty()
  cost: string;

  @ApiProperty({ type: () => WarehouseItemResponseDto })
  warehouseItem: WarehouseItemResponseDto;

  constructor(vo: RepairPartVO) {
    const props = RepairPartVO.toJSON(vo);

    this.quantity = props.quantity;
    this.cost = props.cost;
    this.warehouseItem = new WarehouseItemResponseDto(props.warehouseItem);
  }
}
