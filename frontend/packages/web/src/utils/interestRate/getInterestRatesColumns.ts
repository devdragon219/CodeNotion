import { TableColumn } from '@realgimm5/frontend-common/interfaces';

import { InterestRateFragment } from '../../gql/RealGimm.Web.InterestRate.fragment';

export const getInterestRatesColumns = (): TableColumn<InterestRateFragment>[] => [
  {
    id: 'since',
    type: 'date',
    label: 'interest_rate.field.since',
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: 'until',
    type: 'date',
    label: 'interest_rate.field.until',
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: 'rate',
    label: 'interest_rate.field.rate',
    type: 'number',
    enableColumnFilter: true,
    enableSorting: true,
  },
];
