import { WarningAmber } from '@mui/icons-material';
import { CommunicationType } from '@realgimm5/frontend-common/gql/types';
import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { TFunction } from 'i18next';

import { RegistryCommunicationGroupFragment } from '../../gql/RealGimm.Web.RegistryCommunicationGroup.fragment';

export const getRegistryCommunicationGroupsColumns = (
  isConfirmed: boolean,
  t: TFunction,
): TableColumn<RegistryCommunicationGroupFragment>[] => [
  {
    id: 'managementSubjectName',
    label: 'registry_communication.field.management_subject',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
    getRowValue: (row) => row.managementSubject.name,
  },
  {
    id: 'id.isActiveContract',
    label: 'registry_communication.field.contract_type',
    type: 'boolean',
    enableColumnFilter: true,
    enableSorting: true,
    useRowValue: true,
    getOptionLabel: (option) => t(`registry_communication.text.${option ? 'active' : 'passive'}_contract`),
    getRowValue: (row) => t(`registry_communication.text.${row.id.isActiveContract ? 'active' : 'passive'}_contract`),
  },
  {
    id: 'id.communicationType',
    label: 'registry_communication.field.communication_type',
    options: Object.values(CommunicationType),
    multiple: true,
    enableColumnFilter: true,
    enableSorting: true,
    getOptionLabel: (option) => t(`common.enum.communication_type.${option as CommunicationType}`),
  },
  {
    id: 'id.endDate',
    label: 'registry_communication.field.end_date',
    type: 'date',
    enableColumnFilter: true,
    enableSorting: true,
  },
  ...((isConfirmed
    ? [
        {
          id: 'id.date',
          label: 'registry_communication.field.payment_date',
          type: 'date',
          enableColumnFilter: true,
          enableSorting: true,
        },
        {
          id: 'requestingSubjectLegalRepresentativeName',
          label: 'registry_communication.field.legal_representative',
          enableColumnFilter: true,
          enableGlobalFilter: true,
          enableSorting: true,
          getRowValue: (row) => row.requestingSubjectLegalRepresentative?.name,
        },
        {
          id: 'debtBankAccountReferenceCode',
          label: 'registry_communication.field.bank_account',
          enableColumnFilter: true,
          enableGlobalFilter: true,
          enableSorting: true,
          getRowValue: (row) => row.debtBankAccount?.referenceCode,
        },
      ]
    : []) as TableColumn<RegistryCommunicationGroupFragment>[]),
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
];
