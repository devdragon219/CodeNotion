import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { TFunction } from 'i18next';

import { UsageTypeApplicability } from '../../enums/UsageTypeApplicability';
import { UsageTypeFragment } from '../../gql/RealGimm.Web.EstateUsageType.fragment';

export const getUsageTypesColumns = (t: TFunction): TableColumn<UsageTypeFragment>[] => [
  {
    id: 'ordering',
    label: 'usage_type.field.ordering',
    type: 'number',
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: 'internalCode',
    label: 'usage_type.field.internal_code',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'name',
    label: 'usage_type.field.name',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'applicability',
    label: 'usage_type.field.applicability',
    enableColumnFilter: true,
    multiple: true,
    options: Object.values(UsageTypeApplicability),
    getOptionLabel: (option) => t(`core.enum.usage_type_applicability.${option as UsageTypeApplicability}`),
    getRowValue: (row) =>
      [
        row.isForEstate ? UsageTypeApplicability.Estate : undefined,
        row.isForEstateUnit ? UsageTypeApplicability.EstateUnit : undefined,
        row.isForEstateSubUnit ? UsageTypeApplicability.EstateSubUnit : undefined,
        row.isForContracts ? UsageTypeApplicability.Contract : undefined,
      ].filter((it) => !!it),
  },
];
