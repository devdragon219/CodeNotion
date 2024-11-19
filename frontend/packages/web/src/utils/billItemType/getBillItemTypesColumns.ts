import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { TFunction } from 'i18next';

import { Applicability } from '../../enums/Applicability';
import { BillItemTypeFragment } from '../../gql/RealGimm.Web.BillItemType.fragment';

export const getBillItemTypesColumns = (t: TFunction): TableColumn<BillItemTypeFragment>[] => [
  {
    id: 'internalCode',
    label: 'bill_item_type.field.internal_code',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'description',
    label: 'bill_item_type.field.description',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'applicability',
    label: 'bill_item_type.field.applicability',
    enableColumnFilter: true,
    multiple: true,
    options: Object.values(Applicability),
    getOptionLabel: (option) => t(`core.enum.applicability.${option as Applicability}`),
    getRowValue: (row) =>
      [
        row.isForAdministration ? Applicability.Administration : undefined,
        row.isForContractCosts ? Applicability.ContractCosts : undefined,
        row.isForContractFee ? Applicability.ContractFee : undefined,
      ].filter((it) => !!it),
  },
  {
    id: 'isPositive',
    label: 'bill_item_type.field.sign',
    enableColumnFilter: true,
    options: [true, false],
    getOptionLabel: (option) => (option ? '+' : '-'),
  },
  {
    id: 'defaultAccountingItemInternalCode',
    label: 'bill_item_type.field.accounting_item',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
    getRowValue: (row) => row.defaultAccountingItem?.internalCode,
  },
  {
    id: 'activeSubjectVR.description',
    label: 'bill_item_type.field.active_subject_vr',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
    initialVisibility: 'hidden',
  },
  {
    id: 'activeExemptVR.description',
    label: 'bill_item_type.field.active_exempt_vr',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
    initialVisibility: 'hidden',
  },
  {
    id: 'activeNonTaxableVR.description',
    label: 'bill_item_type.field.active_non_taxable_vr',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
    initialVisibility: 'hidden',
  },
  {
    id: 'passiveSubjectVR.description',
    label: 'bill_item_type.field.passive_subject_vr',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
    initialVisibility: 'hidden',
  },
  {
    id: 'passiveExemptVR.description',
    label: 'bill_item_type.field.passive_exempt_vr',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
    initialVisibility: 'hidden',
  },
  {
    id: 'passiveNonTaxableVR.description',
    label: 'bill_item_type.field.passive_non_taxable_vr',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
    initialVisibility: 'hidden',
  },
];
