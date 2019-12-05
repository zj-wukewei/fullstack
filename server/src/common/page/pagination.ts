export class Pagination<PaginationObjetc> {
  constructor(
    public readonly list: PaginationObjetc[],
    public readonly totalSize: number,
    public readonly hasMore: boolean,
    public readonly current: number,
    public readonly pageSize: number,
  ) {}
}
