import { UtilityServiceFilterInput } from '@realgimm5/frontend-common/gql/types';
import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { createObjectFromKey, getTableRangeFilter } from '@realgimm5/frontend-common/utils';

import { UtilityServiceFragment } from '../../gql/RealGimm.Web.UtilityService.fragment';

export const getUtilityServicesFilterInput = (
  { id: columnId }: TableColumn<UtilityServiceFragment>,
  value: unknown,
): UtilityServiceFilterInput => {
  switch (columnId) {
    case 'utilityType':
      return {
        utilityType: {
          or: [
            {
              internalCode: {
                contains: value as string,
              },
            },
            {
              description: {
                contains: value as string,
              },
            },
          ],
        },
      };
    case 'providerSubjectVatNumber':
      return {
        or: [
          {
            providerSubjectBaseCountryTaxIdCode: {
              contains: value as string,
            },
          },
          {
            providerSubjectProfessionalTaxIdCode: {
              contains: value as string,
            },
          },
        ],
      };
    case 'utilityType.category':
    case 'status':
    case 'utilityType.meteringType':
      return createObjectFromKey(columnId, {
        in: value,
      });
    case 'activationDate':
    case 'deposit':
      return getTableRangeFilter(columnId, value);
    case 'isFreeMarket':
      return createObjectFromKey(columnId, {
        eq: value,
      });
    case 'accountingItem':
      return {
        or: [
          {
            accountingItemDescription: {
              contains: value as string,
            },
          },
          {
            accountingItemInternalCode: {
              contains: value as string,
            },
          },
        ],
      };
    default:
      return createObjectFromKey(columnId, {
        contains: value,
      });
  }
};
