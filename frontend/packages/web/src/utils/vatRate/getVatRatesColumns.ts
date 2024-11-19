import { VatRateType } from '@realgimm5/frontend-common/gql/types';
import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { TFunction } from 'i18next';

import { VatRateFragment } from '../../gql/RealGimm.Web.VatRate.fragment';

export const getVatRatesColumns = (t: TFunction): TableColumn<VatRateFragment>[] => [
  {
    id: 'internalCode',
    label: 'vat_rate.field.internal_code',
    enableColumnFilter: true,
    enableSorting: true,
    enableGlobalFilter: true,
  },
  {
    id: 'description',
    label: 'vat_rate.field.description',
    enableColumnFilter: true,
    enableSorting: true,
    enableGlobalFilter: true,
  },
  {
    id: 'type',
    label: 'vat_rate.field.type',
    enableColumnFilter: true,
    multiple: true,
    options: Object.values(VatRateType),
    getOptionLabel: (option) => t(`common.enum.vat_rate_type.${option as VatRateType}`),
  },
  {
    id: 'ratePercent',
    label: 'vat_rate.field.rate_percent',
    type: 'number',
    enableColumnFilter: true,
    enableSorting: true,
  },
];
