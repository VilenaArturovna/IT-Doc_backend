import { ApiProperty } from '@nestjs/swagger';

export interface PaginationResponseDtoProps {
  page: number;
  limit: number;
  total: number;
  data: any;
}

export class PaginationResponseDto<Data> {
  constructor(data: Data[], props: PaginationResponseDtoProps) {
    this.page = props.page;
    this.limit = props.limit;
    this.total = props.total;
    this.data = data;
  }

  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  total: number;

  @ApiProperty({ isArray: true })
  data: Data[];
}
