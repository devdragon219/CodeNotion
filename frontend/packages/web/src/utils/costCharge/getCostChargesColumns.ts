import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { ReactElement } from 'react';

import { CostChargeFragment } from '../../gql/RealGimm.Web.CostCharge.fragment';

export const getCostChargesColumns = (
  showAllEstates: (row: CostChargeFragment) => ReactElement,
  showAllEstateUnits: (row: CostChargeFragment) => ReactElement,
): TableColumn<CostChargeFragment>[] => [
  {
    id: 'service.estateInternalCode',
    label: 'cost_charge.field.estates',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    getRowValue: (row) => {
      if (row.service.estates.length === 0) {
        return '-';
      }
      return showAllEstates(row);
    },
  },
  {
    id: 'service.estateUnitInternalCode',
    label: 'cost_charge.field.estate_units',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    getRowValue: (row) => {
      if (row.service.estateUnits.length === 0) {
        return '-';
      }
      return showAllEstateUnits(row);
    },
  },
  {
    id: 'utilityType',
    label: 'cost_charge.field.utility_type',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
    getRowValue: (row) => `${row.service.utilityType.internalCode} - ${row.service.utilityType.description}`,
  },
  {
    id: 'referenceDate',
    type: 'date',
    label: 'cost_charge.field.reference_date',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'periodStart',
    type: 'date',
    label: 'cost_charge.field.period_start',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'periodEnd',
    type: 'date',
    label: 'cost_charge.field.period_end',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'totalAmount',
    type: 'currency',
    label: 'cost_charge.field.total_amount',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'dueDate',
    type: 'date',
    label: 'cost_charge.field.due_date',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'invoiceNumber',
    label: 'cost_charge.field.invoice_number',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'totalVATAmount',
    type: 'currency',
    label: 'cost_charge.field.vat_amount',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'invoicedConsumptionAmount',
    type: 'number',
    label: 'cost_charge.field.invoiced_consumption',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
    getRowValue: (row) => `${row.invoicedConsumptionAmount} ${row.service.utilityType.measurementUnit}`,
  },
];
