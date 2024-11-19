import { Month } from '@realgimm5/frontend-common/enums';
import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { parseMonthIndexToMonth } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';

import { RevaluationDataFragment } from '../../gql/RealGimm.Web.RevaluationData.fragment';

export const getRevaluationDataColumns = (t: TFunction): TableColumn<RevaluationDataFragment>[] => [
  {
    id: 'year',
    label: 'revaluation_data.field.year',
    type: 'number',
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: 'month',
    label: 'revaluation_data.field.month',
    enableColumnFilter: true,
    enableSorting: true,
    multiple: true,
    options: Object.values(Month),
    useRowValue: true,
    useSortedOptions: false,
    getOptionLabel: (option) => (option ? t(`common.enum.month.${option as Month}`) : ''),
    getRowValue: (row) => {
      const month = parseMonthIndexToMonth(row.month);
      return month ? t(`common.enum.month.${month}`) : null;
    },
  },
  {
    id: 'baseYear',
    label: 'revaluation_data.field.base_year',
    type: 'number',
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: 'revaluationIndex',
    label: 'revaluation_data.field.index',
    type: 'number',
    enableColumnFilter: true,
    enableSorting: true,
  },
];
