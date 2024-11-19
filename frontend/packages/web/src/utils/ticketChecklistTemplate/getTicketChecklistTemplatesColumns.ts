import { TicketChecklistTemplateType } from '@realgimm5/frontend-common/gql/types';
import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { TFunction } from 'i18next';

import { TicketChecklistTemplateFragment } from '../../gql/RealGimm.Web.TicketChecklistTemplate.fragment';

export const getTicketChecklistTemplatesColumns = (t: TFunction): TableColumn<TicketChecklistTemplateFragment>[] => [
  {
    id: 'internalCode',
    label: 'ticket_checklist_template.field.internal_code',
    enableColumnFilter: true,
    enableSorting: true,
    enableGlobalFilter: true,
  },
  {
    id: 'name',
    label: 'ticket_checklist_template.field.name',
    enableColumnFilter: true,
    enableSorting: true,
    enableGlobalFilter: true,
  },
  {
    id: 'catalogueCategory',
    label: 'ticket_checklist_template.field.catalogue_category',
    enableColumnFilter: true,
    enableSorting: true,
    enableGlobalFilter: true,
    getRowValue: (row) => row.catalogueType.category.name,
  },
  {
    id: 'catalogueSubCategory',
    label: 'ticket_checklist_template.field.catalogue_subcategory',
    enableColumnFilter: true,
    enableSorting: true,
    enableGlobalFilter: true,
    getRowValue: (row) => row.catalogueType.subCategory?.name,
  },
  {
    id: 'type',
    label: 'ticket_checklist_template.field.ticket_checklist_template_type',
    options: Object.values(TicketChecklistTemplateType),
    getOptionLabel: (option) =>
      t(`common.enum.ticket_checklist_template_type.${option as TicketChecklistTemplateType}`),
    enableColumnFilter: true,
    enableSorting: true,
  },
];
