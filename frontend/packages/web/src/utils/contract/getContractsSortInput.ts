import { ContractSortInput, SortEnumType } from '@realgimm5/frontend-common/gql/types';
import { createObjectFromKey } from '@realgimm5/frontend-common/utils';

export const getContractsSortInput = (columnId: string, sortType: SortEnumType): ContractSortInput => {
  switch (columnId) {
    case 'typeDescription':
      return {
        type: {
          description: sortType,
        },
      };
    case 'expirationDate':
      return {
        secondTermExpirationDate: sortType,
      };
    default:
      return createObjectFromKey(columnId, sortType);
  }
};
