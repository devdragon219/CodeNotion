import { ContractTerminator, EntryStatus, ReleaseReason } from '@realgimm5/frontend-common/gql/types';
import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { TFunction } from 'i18next';
import { ReactElement } from 'react';

import { ContractFragment } from '../../gql/RealGimm.Web.ContractListOutput.fragment';

export const getContractsColumns = (
  isActive: boolean,
  t: TFunction,
  showAll: (row: ContractFragment) => ReactElement,
  options?: {
    useStatus?: boolean;
  },
): TableColumn<ContractFragment>[] => {
  const useStatus = options?.useStatus ?? true;

  return [
    {
      id: 'internalCode',
      label: 'contract.field.contract_code',
      enableColumnFilter: true,
      enableGlobalFilter: true,
      enableSorting: true,
    },
    {
      id: 'externalCode',
      label: 'contract.field.external_code',
      initialVisibility: 'hidden',
      enableColumnFilter: true,
      enableGlobalFilter: true,
      enableSorting: true,
    },
    {
      id: 'counterpartName',
      label: 'contract.field.counterpart_main',
      enableColumnFilter: true,
      enableGlobalFilter: true,
      enableSorting: true,
    },
    {
      id: 'typeDescription',
      label: 'contract.field.contract_type',
      enableColumnFilter: true,
      enableGlobalFilter: true,
      enableSorting: true,
    },
    ...(isActive
      ? [
          {
            id: 'isSublocated',
            type: 'boolean',
            label: 'contract.field.sublocated',
            initialVisibility: 'hidden',
            enableColumnFilter: true,
            enableSorting: true,
          } as TableColumn<ContractFragment>,
        ]
      : []),
    ...(useStatus
      ? [
          {
            id: 'status',
            label: 'contract.field.contract_status',
            enableColumnFilter: true,
            multiple: true,
            options: Object.values(EntryStatus),
            getOptionLabel: (option) => t(`common.enum.entry_status.${option as EntryStatus}`),
          } as TableColumn<ContractFragment>,
        ]
      : []),
    {
      id: 'effectStartDate',
      type: 'date',
      label: 'contract.field.effect_date',
      enableColumnFilter: true,
      enableSorting: true,
    },
    {
      id: 'expirationDate',
      type: 'date',
      label: 'contract.field.expiration_date',
      enableColumnFilter: true,
      enableSorting: true,
    },
    {
      id: 'daysToExpiration',
      type: 'number',
      label: 'contract.field.expiration_days',
      enableColumnFilter: true,
      enableSorting: true,
    },
    {
      id: 'locatedUnits',
      label: `contract.field.located_unit_estate${isActive ? '_sub_' : '_'}unit_code`,
      enableColumnFilter: true,
      getRowValue: (row) => {
        if (row.locatedUnits.length === 0) {
          return '-';
        }
        return showAll(row);
      },
    },
    {
      id: 'managementSubjectName',
      label: 'contract.field.management_subject',
      enableColumnFilter: true,
      enableGlobalFilter: true,
      enableSorting: true,
    },
    {
      id: 'releaseDate',
      type: 'date',
      label: 'contract.field.release_date',
      initialVisibility: 'hidden',
      enableColumnFilter: true,
      enableSorting: true,
    },
    {
      id: 'releaseReason',
      label: 'contract.field.release_reason',
      initialVisibility: 'hidden',
      enableColumnFilter: true,
      multiple: true,
      options: Object.values(ReleaseReason),
      getOptionLabel: (option) => (option ? t(`common.enum.release_reason.${option as ReleaseReason}`) : ''),
    },
    {
      id: 'terminationDate',
      type: 'date',
      label: 'contract.field.termination_date',
      initialVisibility: 'hidden',
      enableColumnFilter: true,
      enableSorting: true,
    },
    {
      id: 'terminator',
      label: 'contract.field.terminator',
      initialVisibility: 'hidden',
      enableColumnFilter: true,
      options: Object.values(ContractTerminator),
      getOptionLabel: (option) => (option ? t(`common.enum.contract_terminator.${option as ContractTerminator}`) : ''),
    },
    {
      id: 'isOccupiedWithoutRight',
      type: 'boolean',
      label: 'contract.field.occupied_without_rights',
      initialVisibility: 'hidden',
      enableColumnFilter: true,
      enableSorting: true,
    },
  ];
};
