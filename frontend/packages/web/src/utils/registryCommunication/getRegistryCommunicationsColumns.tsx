import { CancelOutlined, CheckCircleOutline, WarningAmber } from '@mui/icons-material';
import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { ReactElement } from 'react';

import { RegistryCommunicationFragment } from '../../gql/RealGimm.Web.RegistryCommunication.fragment';

export const getRegistryCommunicationsColumns = (
  isConfirmed: boolean,
  showAll: (row: RegistryCommunicationFragment) => ReactElement,
): TableColumn<RegistryCommunicationFragment>[] => [
  {
    id: 'contract.internalCode',
    label: 'registry_communication.field.contract_code',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'anyEstateUnitInternalCode',
    label: 'registry_communication.field.estate_units',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    getRowValue: (row) => {
      if (row.estatesUnits.length === 0) {
        return '-';
      }
      return showAll(row);
    },
  },
  {
    id: 'contract.landlordName',
    label: 'registry_communication.field.landlord',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
    getRowValue: (row) => row.contract?.landlord.name,
  },
  {
    id: 'contract.tenantName',
    label: 'registry_communication.field.tenant',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
    getRowValue: (row) => row.contract?.tenant.name,
  },
  {
    id: 'debtAmount',
    label: 'registry_communication.field.debt_amount',
    type: 'currency',
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: 'hasAnomalies',
    label: 'registry_communication.field.anomalies',
    type: 'boolean',
    enableColumnFilter: true,
    enableSorting: true,
    useRowValue: true,
    getRowValue: (row) =>
      row.hasAnomalies ? (
        <WarningAmber
          sx={(theme) => ({
            color: theme.palette.danger[300],
            width: 24,
            height: 24,
          })}
        />
      ) : null,
  },
  ...((isConfirmed
    ? []
    : [
        {
          id: 'isExcluded',
          label: 'registry_communication.field.included_excluded',
          type: 'boolean',
          enableColumnFilter: true,
          enableSorting: true,
          useRowValue: true,
          getRowValue: (row) =>
            row.isExcluded ? (
              <CancelOutlined
                sx={(theme) => ({
                  color: theme.palette.danger[300],
                  width: 24,
                  height: 24,
                })}
              />
            ) : (
              <CheckCircleOutline
                sx={(theme) => ({
                  color: theme.palette.green[700],
                  width: 24,
                  height: 24,
                })}
              />
            ),
        },
      ]) as TableColumn<RegistryCommunicationFragment>[]),
];
