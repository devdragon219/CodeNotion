import { EntryStatus } from '@realgimm5/frontend-common/gql/types';
import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { TFunction } from 'i18next';

import { FacilityContractFragment } from '../../gql/RealGimm.Web.FacilityContract.fragment';

export const getFacilityContractsColumns = (t: TFunction): TableColumn<FacilityContractFragment>[] => [
  {
    id: 'internalCode',
    label: 'facility_contract.field.internal_code',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'externalCode',
    label: 'facility_contract.field.external_code',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'type.name',
    label: 'facility_contract.field.contract_type',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'entryStatus',
    label: 'facility_contract.field.contract_status',
    enableColumnFilter: true,
    multiple: true,
    options: Object.values(EntryStatus),
    getOptionLabel: (option) => t(`common.enum.entry_status.${option as EntryStatus}`),
  },
  {
    id: 'providerSubjectName',
    label: 'facility_contract.field.provider_subject',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
    getRowValue: (row) => row.providerSubject.name,
  },
  {
    id: 'description',
    label: 'facility_contract.field.description',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    enableSorting: true,
  },
  {
    id: 'agreementDate',
    label: 'facility_contract.field.agreement_date',
    type: 'date',
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: 'effectiveDate',
    label: 'facility_contract.field.effective_date',
    type: 'date',
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: 'expirationDate',
    label: 'facility_contract.field.expiration_date',
    type: 'date',
    enableColumnFilter: true,
    enableSorting: true,
  },
];
