import { CostChargeFilterInput } from '@realgimm5/frontend-common/gql/types';
import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { createObjectFromKey, getTableRangeFilter } from '@realgimm5/frontend-common/utils';

import { CostChargeFragment } from '../../gql/RealGimm.Web.CostCharge.fragment';

export const getCostChargesFilterInput = (
  { id: columnId }: TableColumn<CostChargeFragment>,
  value: unknown,
): CostChargeFilterInput => {
  switch (columnId) {
    case 'utilityType':
      return {
        service: {
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
        },
      };
    case 'periodStart':
    case 'periodEnd':
    case 'referenceDate':
    case 'totalAmount':
    case 'dueDate':
    case 'totalVATAmount':
    case 'invoicedConsumptionAmount':
      return getTableRangeFilter(columnId, value);
    default:
      return createObjectFromKey(columnId, {
        contains: value,
      });
  }
};
