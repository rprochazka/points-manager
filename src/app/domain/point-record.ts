export interface IPointRecord {
  owner: string;
  reason: string;
  note: string;
  points: number;
  lastModifiedBy: string;
  lastModifiedDate: string;
  paid: boolean;
  paidDate: string;
}

export class PagedItems<T> {
  items: T[];
  totalCount: number;
  pageSize: number;
  pageIndex: number;
}

export enum OrderByDirection {
  Asc = 0,
  Desc = 1,
}
export class OrderBy {
  property: string;
  direction: OrderByDirection;
}

export class PointsFilter {
  owner: string;
  reason: string;
  lastModifiedBy: string;
  dateFrom: string;
  dateTo: string;
  paid: string;
  queryOptions: QueryOptions = new QueryOptions();
}

// tslint:disable-next-line:max-classes-per-file
export class QueryOptions {
  get skip(): number | null {
    if (this.take && this.skipPages) {
      return this.take + this.skipPages;
    }
    return null;
  }
  take?: number;
  searchExpression: string;
  orderBy: OrderBy[] = new Array<OrderBy>();
  skipPages?: number;
}

