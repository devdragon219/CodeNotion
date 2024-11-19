import { Month } from '@realgimm5/frontend-common/enums';
import { AssetNature, RegistrationTaxIncomeTypeRli } from '@realgimm5/frontend-common/gql/types';
import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { parseMonthIndexToMonth } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';

import { ContractTypeFragment } from '../../gql/RealGimm.Web.ContractType.fragment';

export const getContractTypesColumns = (t: TFunction): TableColumn<ContractTypeFragment>[] => [
  {
    id: 'internalCode',
    label: 'contract_type.field.internal_code',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'description',
    label: 'contract_type.field.description',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'isActive',
    label: 'contract_type.field.typology',
    enableColumnFilter: true,
    options: [true, false],
    getOptionLabel: (option) => t(`contract_type.contract_typology.${option ? 'active' : 'passive'}`),
  },
  {
    id: 'isRentChargeApplicable',
    label: 'contract_type.field.fee',
    type: 'boolean',
    enableColumnFilter: true,
  },
  {
    id: 'nature',
    label: 'contract_type.field.nature_type',
    enableColumnFilter: true,
    initialVisibility: 'hidden',
    multiple: true,
    options: Object.values(AssetNature),
    getOptionLabel: (option) => t(`common.enum.asset_nature.${option as AssetNature}`),
  },
  {
    id: 'usageTypeName',
    label: 'contract_type.field.usage_type',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
    initialVisibility: 'hidden',
    getRowValue: (row) => row.usageType.name,
  },
  {
    id: 'isRegistrationTax',
    label: 'contract_type.field.registration_tax',
    type: 'boolean',
    enableColumnFilter: true,
  },
  {
    id: 'isStampTax',
    label: 'contract_type.field.stamp_tax',
    type: 'boolean',
    enableColumnFilter: true,
  },
  {
    id: 'registrationTaxIncomeType',
    label: 'contract_type.field.registration_tax_income_type',
    enableColumnFilter: true,
    initialVisibility: 'hidden',
    multiple: true,
    options: Object.values(RegistrationTaxIncomeTypeRli),
    getOptionLabel: (option) =>
      option ? t(`common.enum.registration_tax_income_type_rli.${option as RegistrationTaxIncomeTypeRli}`) : '',
  },
  {
    id: 'registrationTaxPercent',
    type: 'number',
    label: 'contract_type.field.registration_tax_percent',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
    initialVisibility: 'hidden',
  },
  {
    id: 'registrationTaxTenantPercent',
    type: 'number',
    label: 'contract_type.field.registration_tax_tenant_percent',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
    initialVisibility: 'hidden',
  },
  {
    id: 'isRevaluationApplicable',
    label: 'contract_type.field.revaluation',
    type: 'boolean',
    enableColumnFilter: true,
  },
  {
    id: 'isAbsoluteRevaluation',
    label: 'contract_type.field.is_absolute_revaluation',
    type: 'boolean',
    enableColumnFilter: true,
  },
  {
    id: 'revaluationRatePercent',
    type: 'number',
    label: 'contract_type.field.revaluation_percent',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
    initialVisibility: 'hidden',
  },
  {
    id: 'revaluationIndexMonth',
    label: 'contract_type.field.revaluation_index_month',
    enableColumnFilter: true,
    enableSorting: true,
    initialVisibility: 'hidden',
    multiple: true,
    options: Object.values(Month),
    useRowValue: true,
    useSortedOptions: false,
    getOptionLabel: (option) => (option ? t(`common.enum.month.${option as Month}`) : ''),
    getRowValue: (row) => {
      const revaluationIndexMonth = parseMonthIndexToMonth(row.revaluationIndexMonth);
      return revaluationIndexMonth ? t(`common.enum.month.${revaluationIndexMonth}`) : null;
    },
  },
  {
    id: 'revaluationCalculationMonth',
    label: 'contract_type.field.revaluation_calculation_month',
    enableColumnFilter: true,
    enableSorting: true,
    initialVisibility: 'hidden',
    multiple: true,
    options: Object.values(Month),
    useRowValue: true,
    useSortedOptions: false,
    getOptionLabel: (option) => (option ? t(`common.enum.month.${option as Month}`) : ''),
    getRowValue: (row) => {
      const revaluationCalculationMonth = parseMonthIndexToMonth(row.revaluationCalculationMonth);
      return revaluationCalculationMonth ? t(`common.enum.month.${revaluationCalculationMonth}`) : null;
    },
  },
];
