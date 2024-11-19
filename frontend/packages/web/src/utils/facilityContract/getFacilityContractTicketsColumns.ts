import { TicketMasterStatus } from '@realgimm5/frontend-common/gql/types';
import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { getFullName } from '@realgimm5/frontend-common/utils';
import { TFunction } from 'i18next';

import { SORTED_TICKET_MASTER_STATUSES } from '../../configs/ticket';
import { GroupedFacilityContractTicketRow } from '../../interfaces/FormInputs/FacilityContract';

export const getFacilityContractTicketsColumns = (
  t: TFunction,
  options?: { useGroupByEstateUnit?: boolean; useGroupByYear?: boolean; useMainType?: boolean },
): TableColumn<GroupedFacilityContractTicketRow>[] => [
  ...((options?.useGroupByYear
    ? [
        {
          id: 'requestYear',
          label: 'facility_contract.field.ticket_year',
          enableColumnFilter: true,
          enableSorting: true,
          enableGlobalFilter: true,
          getCanExpand: (depth) => depth === 0,
        },
      ]
    : []) as TableColumn<GroupedFacilityContractTicketRow>[]),
  ...((options?.useGroupByEstateUnit
    ? [
        {
          id: 'locationEstateUnitInternalCode',
          label: 'facility_contract.field.ticket_estate_unit_code',
          enableColumnFilter: true,
          enableSorting: true,
          enableGlobalFilter: true,
          getCanExpand: (depth) => depth === (options.useGroupByYear ? 1 : 0),
          getRowValue: (row) => row.locationEstateUnit?.internalCode,
        },
      ]
    : []) as TableColumn<GroupedFacilityContractTicketRow>[]),
  {
    id: 'internalCode',
    label: 'facility_contract.field.ticket_code',
    enableColumnFilter: true,
    enableSorting: true,
    enableGlobalFilter: true,
  },
  {
    id: 'description',
    label: 'facility_contract.field.ticket_description',
    enableColumnFilter: true,
    enableSorting: true,
    enableGlobalFilter: true,
  },
  {
    id: 'masterStatus',
    label: 'facility_contract.field.ticket_status',
    options: SORTED_TICKET_MASTER_STATUSES,
    multiple: true,
    useSortedOptions: false,
    getOptionLabel: (option) => t(`common.enum.ticket_master_status.${option as TicketMasterStatus}`),
    enableColumnFilter: true,
    useRowValue: true,
    getRowValue: (row) => (row.masterStatus ? t(`common.enum.ticket_master_status.${row.masterStatus}`) : ''),
  },
  {
    id: 'dueDate',
    type: 'date',
    label: 'facility_contract.field.ticket_due_date',
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    id: 'catalogueType.category.name',
    label: 'facility_contract.field.ticket_category',
  },
  {
    id: 'catalogueType.subCategory.name',
    label: 'facility_contract.field.ticket_subcategory',
  },
  {
    id: 'catalogueType.name',
    label: 'facility_contract.field.ticket_catalogue_type',
  },
  {
    id: 'catalogueItems',
    label: 'facility_contract.field.ticket_catalogue_item',
    getRowValue: (row) => (row.catalogueItems ? row.catalogueItems[0].internalCode : ''),
  },
  {
    id: 'requestDateTime',
    type: 'date',
    label: 'facility_contract.field.ticket_request_date',
    enableColumnFilter: true,
    initialVisibility: 'hidden',
  },
  {
    id: 'supplierSubjectName',
    label: 'facility_contract.field.ticket_supplier_subject',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    initialVisibility: 'hidden',
    getRowValue: (row) => row.supplierSubject?.name,
  },
  {
    id: 'plannedTeam.description',
    label: 'facility_contract.field.ticket_planned_team',
    enableColumnFilter: true,
    enableGlobalFilter: true,
    initialVisibility: 'hidden',
  },
  {
    id: 'plannedTeamLeaderUser',
    label: 'facility_contract.field.ticket_planned_team_leader',
    initialVisibility: 'hidden',
    getRowValue: (row) => getFullName(row.plannedTeamLeaderUser?.firstName, row.plannedTeamLeaderUser?.lastName),
  },
];
