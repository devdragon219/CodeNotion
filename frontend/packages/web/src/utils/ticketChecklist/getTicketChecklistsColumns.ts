import { TicketChecklistTemplateType } from '@realgimm5/frontend-common/gql/types';
import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { TFunction } from 'i18next';

import { TicketChecklistFragment } from '../../gql/RealGimm.Web.TicketChecklist.fragment';
import { GroupedTicketChecklistRow } from '../../interfaces/FormInputs/TicketChecklist';

export const getTicketChecklistsColumns = <
  T extends TicketChecklistFragment | GroupedTicketChecklistRow = TicketChecklistFragment,
>(
  t: TFunction,
  options?: { useGroupByEstateUnit?: boolean },
): TableColumn<T>[] => [
  ...((options?.useGroupByEstateUnit
    ? [
        {
          id: 'estateUnitInternalCode',
          label: 'ticket_checklist.field.estate_unit_code',
          enableColumnFilter: true,
          enableSorting: true,
          enableGlobalFilter: true,
          getCanExpand: (depth) => depth === 0,
          getRowValue: (row) => row.estateUnit?.internalCode,
        },
      ]
    : []) as TableColumn<T>[]),
  {
    id: 'internalCode',
    label: 'ticket_checklist.field.internal_code',
    enableColumnFilter: true,
    enableSorting: true,
    enableGlobalFilter: true,
  },
  {
    id: 'name',
    label: 'ticket_checklist.field.name',
    enableColumnFilter: true,
    enableSorting: true,
    enableGlobalFilter: true,
  },
  {
    id: 'catalogueCategory',
    label: 'ticket_checklist.field.catalogue_category',
    enableColumnFilter: true,
    enableSorting: true,
    enableGlobalFilter: true,
    getRowValue: (row) => row.catalogueType?.category.name,
  },
  {
    id: 'catalogueSubCategory',
    label: 'ticket_checklist.field.catalogue_subcategory',
    enableColumnFilter: true,
    enableSorting: true,
    enableGlobalFilter: true,
    getRowValue: (row) => row.catalogueType?.subCategory?.name,
  },
  {
    id: 'type',
    label: 'ticket_checklist.field.ticket_checklist_template_type',
    options: Object.values(TicketChecklistTemplateType),
    getOptionLabel: (option) =>
      t(`common.enum.ticket_checklist_template_type.${option as TicketChecklistTemplateType}`),
    enableColumnFilter: true,
    enableSorting: true,
    useRowValue: true,
    getRowValue: (row) => (row.type ? t(`common.enum.ticket_checklist_template_type.${row.type}`) : ''),
  },
];
