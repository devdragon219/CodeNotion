import { SortEnumType } from '../../gql/types';
import { QueryVariables } from '../../interfaces/GraphQL';
import { TableSort } from '../../interfaces/PrimaryTable';
import { createObjectFromKey } from '../objectUtils';

const getDefaultSortInput = <T extends QueryVariables['order']>(columnId: string, sortType: SortEnumType): T => {
  switch (columnId) {
    default:
      return createObjectFromKey(columnId, sortType) as T;
  }
};

export const getTableSortInput = <T extends QueryVariables['order']>(
  columns: TableSort[],
  getSortInput: (columnId: string, sortType: SortEnumType) => T = getDefaultSortInput,
) => {
  const order = columns.flatMap(({ id, desc }) => getSortInput(id, desc ? SortEnumType.Desc : SortEnumType.Asc)) as T[];

  return order.length ? order : undefined;
};
