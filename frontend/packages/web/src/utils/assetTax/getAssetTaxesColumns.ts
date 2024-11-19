import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { ReactElement } from 'react';

import { AssetTaxFragment } from '../../gql/RealGimm.Web.AssetTaxGroupedRow.fragment';

export const getAssetTaxesColumns = (
  showIssues: (row: AssetTaxFragment) => ReactElement,
): TableColumn<AssetTaxFragment>[] => [
  {
    id: 'year',
    type: 'number',
    label: 'asset_tax.field.year',
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: 'managementSubject',
    label: 'asset_tax.field.management_subject',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'isDefinitive',
    label: 'asset_tax.field.definitive',
    type: 'boolean',
    enableColumnFilter: true,
    getRowValue: (row) => row.payments?.some(({ isDefinitive }) => isDefinitive),
  },
  {
    id: 'lastUpdate',
    label: 'asset_tax.field.last_update',
    type: 'date',
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: 'expectedDueDate',
    label: 'asset_tax.field.expected_due_date',
    type: 'date',
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: 'totalTaxableAmount',
    type: 'currency',
    label: 'asset_tax.field.taxable_amount',
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: 'totalAmount',
    type: 'currency',
    label: 'asset_tax.field.amount',
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: 'issues',
    label: 'asset_tax.field.issues',
    type: 'boolean',
    sticky: 'right',
    enableColumnFilter: true,
    useRowValue: true,
    getRowValue: (row) => {
      return row.payments?.some(({ issue }) => !!issue) ? showIssues(row) : null;
    },
  },
];
