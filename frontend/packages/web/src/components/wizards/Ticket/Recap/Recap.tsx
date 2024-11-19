import { Grid2 } from '@mui/material';
import {
  DocumentFieldTable,
  PrimaryTable,
  RecapSection,
  RecapSectionItem,
  SectionTitle,
  StepActions,
  StepContent,
} from '@realgimm5/frontend-common/components';
import { TicketMainType } from '@realgimm5/frontend-common/gql/types';
import { getDefaultDocumentFieldsConfig } from '@realgimm5/frontend-common/utils';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { parseAddressToString } from '../../../../utils/addressUtils';
import { groupCatalogueItems } from '../../../../utils/catalogueItem/groupCatalogueItems';
import { TicketRecapStepProps } from './Recap.types';

export const TicketRecapStep = ({ ticket, onBack, onEdit, onSave }: TicketRecapStepProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const catalogueItems = useMemo(() => groupCatalogueItems(ticket.catalogueItems), [ticket.catalogueItems]);

  const handleEdit = useCallback(
    (step: number) => () => {
      onEdit(step);
    },
    [onEdit],
  );

  const handleComplete = useCallback(() => {
    onSave(ticket);
  }, [ticket, onSave]);

  return (
    <>
      <StepContent>
        <Grid2 container spacing={{ xs: 2, sm: 3 }}>
          <SectionTitle value="ticket.section_title.recap" />
          {ticket.mainType === TicketMainType.ChecklistOnTriggerCondition && (
            <Grid2 size={12}>
              <RecapSection
                title="ticket.tab.estate_unit"
                items={[
                  {
                    label: 'facility_contract.field.internal_code',
                    value: ticket.facilityContract?.internalCode,
                    grid: 4,
                  },
                  {
                    label: 'facility_contract.field.external_code',
                    value: ticket.facilityContract?.externalCode,
                    grid: 4,
                  },
                  {
                    label: 'facility_contract.field.description',
                    value: ticket.facilityContract?.description,
                    grid: 4,
                  },
                ]}
                onEdit={handleEdit(0)}
              />
            </Grid2>
          )}
          <Grid2 size={12}>
            <RecapSection
              title="ticket.tab.estate_unit"
              items={[
                {
                  label: 'ticket.field.estate_unit_code',
                  value: ticket.locationEstateUnit?.internalCode,
                  grid: 4,
                },
                {
                  label: 'ticket.field.estate_unit_name',
                  value: ticket.locationEstateUnit?.name,
                  grid: 4,
                },
                {
                  label: 'ticket.field.estate_unit_address',
                  value: parseAddressToString(ticket.locationEstateUnit?.address, language),
                  grid: 4,
                },
                ...((ticket.mainType !== TicketMainType.ChecklistOnTriggerCondition
                  ? [
                      {
                        label: 'ticket.field.location_floor',
                        value: ticket.locationFloor?.position,
                        grid: 4,
                      },
                      {
                        label: 'ticket.field.location_sector',
                        value: ticket.locationSector,
                        grid: 4,
                      },
                      {
                        label: 'ticket.field.location_room',
                        value: ticket.locationRoom,
                        grid: 4,
                      },
                    ]
                  : []) as RecapSectionItem[]),
              ]}
              onEdit={handleEdit(ticket.mainType === TicketMainType.ChecklistOnTriggerCondition ? 1 : 0)}
            />
          </Grid2>
          {ticket.mainType === TicketMainType.ChecklistOnTriggerCondition ? (
            <>
              <Grid2 size={12}>
                <RecapSection
                  title="ticket.tab.ticket_checklist"
                  items={[
                    {
                      label: 'ticket.field.ticket_checklist_code',
                      value: ticket.ticketChecklist?.internalCode,
                      grid: 4,
                    },
                    {
                      label: 'ticket.field.ticket_checklist_name',
                      value: ticket.ticketChecklist?.name,
                      grid: 4,
                    },
                    {
                      label: 'ticket.field.ticket_checklist_template_type',
                      value: ticket.ticketChecklist?.type
                        ? t(`common.enum.ticket_checklist_template_type.${ticket.ticketChecklist.type}`)
                        : null,
                      grid: 4,
                    },
                  ]}
                  onEdit={handleEdit(2)}
                />
              </Grid2>
              <Grid2 size={12}>
                <RecapSection
                  title="ticket.tab.catalogue_items"
                  items={
                    <PrimaryTable
                      color="secondary"
                      columns={[
                        {
                          id: 'categoryName',
                          label: 'ticket.field.catalogue_category',
                          getCanSelect: (depth) => depth === 0,
                          getCanExpand: (depth) => depth === 0,
                          getRowValue: (row) =>
                            typeof row.id === 'string' && row.id.startsWith('CO')
                              ? row.catalogueType.category.name
                              : '',
                        },
                        {
                          id: 'subCategoryName',
                          label: 'ticket.field.catalogue_subcategory',
                          getCanSelect: (depth) => depth === 1,
                          getCanExpand: (depth) => depth === 1,
                          getRowValue: (row) =>
                            typeof row.id === 'string' && row.id.startsWith('SC')
                              ? (row.catalogueType.subCategory?.name ?? '')
                              : '',
                        },
                        {
                          id: 'typeName',
                          label: 'ticket.field.catalogue_type',
                          getCanSelect: (depth) => depth === 2,
                          getCanExpand: (depth) => depth === 2,
                          getRowValue: (row) =>
                            typeof row.id === 'string' && row.id.startsWith('TO') ? row.catalogueType.name : '',
                        },
                        {
                          id: 'internalCode',
                          label: 'ticket.field.catalogue_item',
                          getCanSelect: (depth) => depth === 3,
                        },
                      ]}
                      empty="ticket.text.no_catalogue_items"
                      rows={catalogueItems}
                      getRowId={(row) => String(row.id)}
                      getSubRows={(row) => row.subRows}
                      useColumnVisibility={false}
                      usePagination={false}
                      useRowActions={false}
                      useRowSelection={false}
                      useSelectedRows={false}
                      useRowExpandCollapse
                    />
                  }
                  onEdit={handleEdit(3)}
                />
              </Grid2>
            </>
          ) : (
            <Grid2 size={12}>
              <RecapSection
                title="ticket.tab.general_data"
                items={[
                  {
                    label: `ticket.field.${ticket.mainType === TicketMainType.Issue ? 'issue' : 'on_condition'}_ticket_code`,
                    value: ticket.internalCode,
                    grid: 4,
                  },
                  {
                    label: 'ticket.field.work_safety_expected',
                    value: ticket.isWorkSafetyExpected,
                    grid: 4,
                  },
                  {
                    label: 'ticket.field.requestor',
                    value: ticket.requestor,
                    grid: 4,
                  },
                  {
                    label: 'ticket.field.requestor_email',
                    value: ticket.requestorContactEmail,
                    grid: 4,
                  },
                  {
                    label: 'ticket.field.requestor_phone',
                    value: ticket.requestorContactPhone,
                    grid: 4,
                  },
                  {
                    label: 'ticket.field.request_date',
                    value: ticket.requestDateTime,
                    grid: 4,
                  },
                  {
                    label: 'ticket.field.request_time',
                    value: ticket.requestDateTime,
                    grid: 4,
                  },
                  {
                    label: 'ticket.field.due_date',
                    value: ticket.dueDate,
                    grid: 4,
                  },
                  {
                    label: 'ticket.field.excluded_from_contract',
                    value: ticket.isExcludedFromMaintenanceContract,
                    grid: 4,
                  },
                  {
                    label: 'ticket.field.ticket_type',
                    value: ticket.customType?.description,
                    grid: 4,
                  },
                  {
                    label: 'ticket.field.priority',
                    value: ticket.priority ? t(`common.enum.priority.${ticket.priority}`) : null,
                    grid: 4,
                  },
                  {
                    label: 'ticket.section_title.ticket_details',
                    value: [
                      {
                        label: 'ticket.field.catalogue_category',
                        value: ticket.catalogueCategory?.name,
                        grid: 4,
                      },
                      {
                        label: 'ticket.field.catalogue_subcategory',
                        value: ticket.catalogueSubCategory?.name,
                        grid: 4,
                      },
                      {
                        label: 'ticket.field.catalogue_type',
                        value: ticket.catalogueType?.name,
                        grid: 4,
                      },
                      {
                        label: 'ticket.field.catalogue_items',
                        value: ticket.catalogueItems.map(({ internalCode }) => internalCode).join(', '),
                        grid: 4,
                      },
                      {
                        label: 'ticket.field.summary',
                        value: ticket.summary,
                        grid: 4,
                      },
                      {
                        label: 'ticket.field.description',
                        value: ticket.description,
                        grid: 4,
                      },
                    ],
                  },
                  {
                    label: 'ticket.section_title.supplier_subjects',
                    value: [
                      {
                        label: 'ticket.field.supplier_subject',
                        value: ticket.supplierSubject?.name,
                      },
                    ],
                  },
                ]}
                onEdit={handleEdit(1)}
              />
            </Grid2>
          )}
          <Grid2 size={12}>
            <RecapSection
              title="ticket.tab.documents"
              items={[
                {
                  label: 'ticket.section_title.images',
                  value:
                    ticket.images.length === 0 ? (
                      {
                        label: 'ticket.text.no_images',
                      }
                    ) : (
                      <DocumentFieldTable rows={ticket.images} />
                    ),
                },
                {
                  label: 'ticket.section_title.documents',
                  value:
                    ticket.documents.length === 0 ? (
                      {
                        label: 'ticket.text.no_documents',
                      }
                    ) : (
                      <DocumentFieldTable fieldsConfig={getDefaultDocumentFieldsConfig()} rows={ticket.documents} />
                    ),
                },
              ]}
              onEdit={handleEdit(2)}
            />
          </Grid2>
        </Grid2>
      </StepContent>
      <StepActions
        completeLabel={`ticket.dialog.create.save.${ticket.mainType}`}
        onBack={onBack}
        onComplete={handleComplete}
      />
    </>
  );
};
