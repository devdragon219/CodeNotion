import { ConfigFunction } from '@realgimm5/frontend-common/gql/types';
import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { parseDateToLocalizedString } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';

import { ConfigFormInput } from '../../interfaces/FormInputs/Config';

export const getConfigsColumns = (t: TFunction, language: string): TableColumn<ConfigFormInput>[] => [
  {
    id: 'function',
    label: 'config.field.function',
    enableColumnFilter: true,
    enableSorting: true,
    options: Object.values(ConfigFunction),
    multiple: true,
    useRowValue: true,
    getCanExpand: (depth) => depth === 0,
    getOptionLabel: (option) => t(`common.enum.config_function.${option as ConfigFunction}`),
    getRowValue: (row) => (row.subRows ? t(`common.enum.config_function.${row.function}`) : ''),
  },
  {
    id: 'name',
    label: 'config.field.name',
    enableColumnFilter: true,
    enableGlobalFilter: true,
  },
  {
    id: 'value',
    label: 'config.field.value',
    enableColumnFilter: true,
    enableGlobalFilter: true,
  },
  {
    id: 'lastUpdated',
    label: 'config.field.last_updated',
    type: 'date',
    enableColumnFilter: true,
    useRowValue: true,
    getRowValue: (row) =>
      parseDateToLocalizedString(row.lastUpdated, language, {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
      }),
  },
];
