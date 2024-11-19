import { AssetTaxGroupedRowFilterInput, CalculationIssue } from '@realgimm5/frontend-common/gql/types';
import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { createObjectFromKey, getTableRangeFilter } from '@realgimm5/frontend-common/utils';

import { AssetTaxFragment } from '../../gql/RealGimm.Web.AssetTaxGroupedRow.fragment';

export const getAssetTaxesFilterInput = (
  { id: columnId }: TableColumn<AssetTaxFragment>,
  value: unknown,
): AssetTaxGroupedRowFilterInput => {
  switch (columnId) {
    case 'isDefinitive':
      return {
        payments: {
          some: {
            isDefinitive: {
              eq: value as boolean,
            },
          },
        },
      };
    case 'year':
    case 'lastUpdate':
    case 'expectedDueDate':
    case 'totalTaxableAmount':
    case 'totalAmount':
      return getTableRangeFilter(columnId, value);
    case 'issues':
      return value
        ? {
            payments: {
              some: {
                issue: {
                  in: Object.values(CalculationIssue),
                },
              },
            },
          }
        : {
            payments: {
              all: {
                issue: {
                  nin: Object.values(CalculationIssue),
                },
              },
            },
          };
    default:
      return createObjectFromKey(columnId, {
        contains: value,
      });
  }
};
