import { SortEnumType, SubjectSortInput } from '@realgimm5/frontend-common/gql/types';
import { createObjectFromKey } from '@realgimm5/frontend-common/utils';

export const getSubjectsSortInput = (
  columnId: string,
  sortType: SortEnumType,
): SubjectSortInput | SubjectSortInput[] => {
  switch (columnId) {
    case 'vatNumber':
      return [
        {
          baseCountryTaxIdCode: sortType,
        },
        {
          professionalTaxIdCode: sortType,
        },
      ];
    case 'taxIdCode':
      return [
        {
          additionalTaxIdCode: sortType,
        },
        {
          birthCountryTaxIdCode: sortType,
        },
      ];
    case 'legalResidentialAddress.toponymy':
      return [
        {
          legalResidentialAddress: {
            toponymy: sortType,
          },
        },
        {
          legalResidentialAddress: {
            numbering: sortType,
          },
        },
      ];
    default:
      return createObjectFromKey(columnId, sortType);
  }
};
