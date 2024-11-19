import { SortEnumType, TicketTypeSortInput } from '@realgimm5/frontend-common/gql/types';
import { createObjectFromKey } from '@realgimm5/frontend-common/utils';

export const getTicketTypesSortInput = (
  columnId: string,
  sortType: SortEnumType,
): TicketTypeSortInput | TicketTypeSortInput[] => {
  switch (columnId) {
    case 'ordering':
      return [
        {
          ordering: sortType,
        },
        {
          description: sortType,
        },
      ];
    default:
      return createObjectFromKey(columnId, sortType);
  }
};
