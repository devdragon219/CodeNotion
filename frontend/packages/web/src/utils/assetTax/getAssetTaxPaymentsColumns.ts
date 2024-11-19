import { IncomeType } from '@realgimm5/frontend-common/gql/types';
import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { TFunction } from 'i18next';

import { AssetTaxPaymentFormInput } from '../../interfaces/FormInputs/AssetTax';
import { parseAddressToString } from '../addressUtils';
import { parseCadastralCoordinatesToString } from '../cadastralUnit/parseCadastralCoordinatesToString';

export const getAssetTaxPaymentsColumns = (language: string, t: TFunction): TableColumn<AssetTaxPaymentFormInput>[] => [
  {
    id: 'cityName',
    label: 'asset_tax.field.city',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
    getCanExpand: (depth) => depth === 0,
  },
  {
    id: 'estate',
    label: 'asset_tax.field.estate',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    getCanExpand: (depth) => depth === 1,
    getRowValue: (row) => row.estateInternalCode ?? row.estatesCount,
  },
  {
    id: 'estateUnit',
    label: 'asset_tax.field.estate_unit',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    getRowValue: (row) => row.estateUnitInternalCode ?? row.estateUnitsCount,
  },
  {
    id: 'address',
    initialVisibility: 'hidden',
    label: 'asset_tax.field.address',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    getRowValue: (row) => parseAddressToString(row.address, language),
  },
  {
    id: 'cadastralCoordinates',
    initialVisibility: 'hidden',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    label: 'asset_tax.field.cadastral_coordinates',
    getRowValue: (row) => parseCadastralCoordinatesToString(row.cadastralCoordinates),
  },
  {
    id: 'cadastralUnitIncome.macroCategory',
    initialVisibility: 'hidden',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    label: 'asset_tax.field.cadastral_unit_income_macro_category',
  },
  {
    id: 'cadastralUnitIncome.microCategory',
    initialVisibility: 'hidden',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    label: 'asset_tax.field.cadastral_unit_income_micro_category',
  },
  {
    id: 'cadastralUnitIncome.metricAmount',
    type: 'number',
    initialVisibility: 'hidden',
    enableColumnFilter: true,
    label: 'asset_tax.field.cadastral_unit_income_metric_amount',
  },
  {
    id: 'actualizedCadastralIncome',
    type: 'currency',
    enableColumnFilter: true,
    label: 'asset_tax.field.actualized_cadastral_income',
    getRowValue: (row) => row.actualizedCadastralIncome ?? row.totalActualizedCadastralIncome,
  },
  {
    id: 'grossCadastralIncome',
    type: 'currency',
    enableColumnFilter: true,
    label: 'asset_tax.field.cadastral_income',
    getRowValue: (row) => row.grossCadastralIncome ?? row.totalGrossCadastralIncome,
  },
  {
    id: 'cadastralUnitIncome.type',
    initialVisibility: 'hidden',
    label: 'asset_tax.field.cadastral_unit_income_type',
    options: Object.values(IncomeType),
    multiple: true,
    enableColumnFilter: true,
    getOptionLabel: (option) => (option ? t(`common.enum.income_type.${option as IncomeType}`) : ''),
  },
  {
    id: 'estateUnitOwnershipPercent',
    type: 'number',
    initialVisibility: 'hidden',
    enableColumnFilter: true,
    label: 'asset_tax.field.estate_unit_ownership_percent',
  },
  {
    id: 'baseTaxableAmount',
    type: 'currency',
    label: 'asset_tax.field.taxable_amount',
    enableColumnFilter: true,
    getRowValue: (row) => row.baseTaxableAmount ?? row.totalBaseTaxableAmount,
  },
  {
    id: 'cadastralUnitTaxConfig.value',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    label: 'asset_tax.field.cadastral_unit_tax_config',
  },
  {
    id: 'amountPaid',
    type: 'currency',
    enableColumnFilter: true,
    label: 'asset_tax.field.amount',
    getRowValue: (row) => row.amountPaid ?? row.totalAmountPaid,
  },
];
