import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { parseStringToDate } from '@realgimm5/frontend-common/utils';
import { ParseKeys, TFunction } from 'i18next';

import { ReadingFragment } from '../../gql/RealGimm.Web.Reading.fragment';
import { UtilityServiceFormInput } from '../../interfaces/FormInputs/UtilityService';

export const getReadingsColumns = (
  isReading: boolean,
  utilityService: UtilityServiceFormInput,
  t: TFunction,
): TableColumn<ReadingFragment>[] => [
  {
    id: 'readingTimestamp',
    type: 'date',
    label: `${isReading ? 'reading' : 'usage'}.field.date`,
    enableColumnFilter: true,
    enableSorting: true,
    getRowValue: (row) => parseStringToDate(row.readingTimestamp),
  },
  ...Array.from(Array(utilityService.utilityType?.timeOfUseRateCount ?? 0)).map<TableColumn<ReadingFragment>>(
    (_, index) => ({
      id: `values_${index}`,
      type: 'number',
      label: t(`${isReading ? 'reading' : 'usage'}.field.value`, { index: index + 1 }) as unknown as ParseKeys,
      enableColumnFilter: true,
      getRowValue: (row) => [row.values[index].value, utilityService.utilityType?.measurementUnit].join(' '),
    }),
  ),
  {
    id: 'isEstimated',
    label: `${isReading ? 'reading' : 'usage'}.field.type`,
    options: [true, false],
    enableColumnFilter: true,
    getOptionLabel: (option) => t(`${isReading ? 'reading' : 'usage'}.estimated.${option as boolean}`),
  },
  {
    id: 'notes',
    label: `${isReading ? 'reading' : 'usage'}.field.notes`,
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
];
