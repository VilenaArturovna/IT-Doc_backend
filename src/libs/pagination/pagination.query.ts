export enum SortingType {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface PaginationQueryParams<
  Filtering = any,
  Sorting extends Record<string, SortingType> = any,
> {
  filter?: Filtering;
  sort?: Sorting;
  page: number;
  limit: number;
}

export interface PaginationData<Data> {
  data: Data[];
  page: number;
  limit: number;
  total: number;
}
