import { Repository, FindConditions, FindManyOptions } from 'typeorm';
import { IPaginationOptions } from './i-pagination-options';
import { Pagination } from './pagination';

export function paginate<T>(
  repository: Repository<T>,
  options: IPaginationOptions,
  searchOptions?: FindConditions<T> | FindManyOptions<T>,
): Promise<Pagination<T>>;

export async function paginate<T>(
  repositoryOrQueryBuilder: Repository<T>,
  options: IPaginationOptions,
  searchOptions?: FindConditions<T> | FindManyOptions<T>,
) {
  return paginateRepo<T>(repositoryOrQueryBuilder, options, searchOptions);
}

function resolveOptions(options: IPaginationOptions): [number, number] {
  const pageNumber = options.pageNumber >= 0 ? options.pageNumber : 0;

  const pageSize = options.pageSize;

  return [pageNumber, pageSize];
}

function createPaginationObject<T>(list: T[], totalSize: number, pageNumber: number, pageSize: number) {
  const hasMore = totalSize > pageNumber * pageSize + list.length;
  return new Pagination(list, totalSize, hasMore, pageNumber, pageSize);
}

async function paginateRepo<T>(
  repository: Repository<T>,
  options: IPaginationOptions,
  searchOptions?: FindConditions<T> | FindManyOptions<T>,
): Promise<Pagination<T>> {
  const [pageNumber, pageSize] = resolveOptions(options);

  const [list, totalSize] = await repository.findAndCount({
    skip: pageNumber * pageSize,
    take: pageSize,
    ...searchOptions,
  });

  return createPaginationObject<T>(list, totalSize, pageNumber, pageSize);
}
