import { Grid2 } from '@mui/material';
import { RecapSection, SectionTitle, StepActions, StepContent } from '@realgimm5/frontend-common/components';
import { TicketChecklistTemplateType } from '@realgimm5/frontend-common/gql/types';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { TicketChecklistTemplateRecapStepProps } from './Recap.types';

export const TicketChecklistTemplateRecapStep = ({
  ticketChecklistTemplate,
  onBack,
  onEdit,
  onSave,
}: TicketChecklistTemplateRecapStepProps) => {
  const { t } = useTranslation();

  const handleEdit = useCallback(
    (step: number) => () => {
      onEdit(step);
    },
    [onEdit],
  );

  const handleComplete = useCallback(() => {
    onSave(ticketChecklistTemplate);
  }, [ticketChecklistTemplate, onSave]);

  return (
    <>
      <StepContent>
        <Grid2 container spacing={{ xs: 2, sm: 3 }}>
          <SectionTitle value="ticket_checklist_template.section_title.recap" />
          <Grid2 size={12}>
            <RecapSection
              title="ticket_checklist_template.tab.general_data"
              items={[
                {
                  grid: 4,
                  label: 'ticket_checklist_template.field.internal_code',
                  value: ticketChecklistTemplate.internalCode,
                },
                {
                  grid: 4,
                  label: 'ticket_checklist_template.field.name',
                  value: ticketChecklistTemplate.name,
                },
                {
                  grid: 4,
                  label: 'ticket_checklist_template.field.catalogue_category',
                  value: ticketChecklistTemplate.catalogueCategory?.name,
                },
                {
                  grid: 4,
                  label: 'ticket_checklist_template.field.catalogue_subcategory',
                  value: ticketChecklistTemplate.catalogueSubCategory?.name,
                },
                {
                  grid: 4,
                  label: 'ticket_checklist_template.field.catalogue_type',
                  value: ticketChecklistTemplate.catalogueType?.name,
                },
                {
                  grid: 4,
                  label: 'ticket_checklist_template.field.ticket_checklist_template_type',
                  value: t(
                    `common.enum.ticket_checklist_template_type.${ticketChecklistTemplate.ticketChecklistTemplateType!}`,
                  ),
                },
              ]}
              onEdit={handleEdit(0)}
            />
          </Grid2>
          <Grid2 size={12}>
            <RecapSection
              title="ticket_checklist_template.tab.costs"
              items={[
                {
                  grid: 4,
                  label: 'ticket_checklist_template.field.measurement_unit',
                  value: t(`common.enum.cost_base_factor.${ticketChecklistTemplate.costBaseFactor!}`),
                },
                {
                  grid: 4,
                  label: 'ticket_checklist_template.field.raw_work_cost',
                  value: ticketChecklistTemplate.rawWorkCost,
                },
                {
                  grid: 4,
                  label: 'ticket_checklist_template.field.safety_cost',
                  value: ticketChecklistTemplate.safetyCost,
                },
              ]}
              onEdit={handleEdit(1)}
            />
          </Grid2>
          {[
            TicketChecklistTemplateType.Preventative,
            TicketChecklistTemplateType.PreventativeAndOnTriggerCondition,
          ].includes(ticketChecklistTemplate.ticketChecklistTemplateType!) && (
            <Grid2 size={12}>
              <RecapSection
                title="ticket_checklist_template.section_title.preventative_maintenance"
                items={[
                  {
                    grid: 4,
                    label: 'ticket_checklist_template.field.planned_period',
                    value: t(`common.enum.planned_period.${ticketChecklistTemplate.preventative.plannedPeriod!}`),
                  },
                  {
                    grid: 4,
                    label: 'ticket_checklist_template.field.intervention_type',
                    value: ticketChecklistTemplate.preventative.interventionType?.name,
                  },
                  {
                    grid: 4,
                    label: 'ticket_checklist_template.field.craft',
                    value: ticketChecklistTemplate.preventative.craft?.name,
                  },
                  {
                    label: 'ticket_checklist_template.section_title.activities',
                    value: {
                      columns: [
                        'ticket_checklist_template.field.activity_type',
                        'ticket_checklist_template.field.activity_name',
                      ],
                      rows: ticketChecklistTemplate.preventative.activities.map((entry) => [
                        t(`common.enum.catalogue_type_activity_type.${entry.activityType!}`),
                        entry.name,
                      ]),
                    },
                  },
                ]}
                onEdit={handleEdit(2)}
              />
            </Grid2>
          )}
          {[
            TicketChecklistTemplateType.OnTriggerCondition,
            TicketChecklistTemplateType.PreventativeAndOnTriggerCondition,
          ].includes(ticketChecklistTemplate.ticketChecklistTemplateType!) && (
            <Grid2 size={12}>
              <RecapSection
                title="ticket_checklist_template.section_title.on_condition_maintenance"
                items={[
                  {
                    grid: 4,
                    label: 'ticket_checklist_template.field.intervention_type',
                    value: ticketChecklistTemplate.onCondition.interventionType?.name,
                  },
                  {
                    grid: 4,
                    label: 'ticket_checklist_template.field.craft',
                    value: ticketChecklistTemplate.onCondition.craft?.name,
                  },
                  {
                    label: 'ticket_checklist_template.section_title.activities',
                    value: {
                      columns: [
                        'ticket_checklist_template.field.activity_type',
                        'ticket_checklist_template.field.activity_name',
                      ],
                      rows: ticketChecklistTemplate.onCondition.activities.map((entry) => [
                        t(`common.enum.catalogue_type_activity_type.${entry.activityType!}`),
                        entry.name,
                      ]),
                    },
                  },
                ]}
                onEdit={handleEdit(
                  ticketChecklistTemplate.ticketChecklistTemplateType ===
                    TicketChecklistTemplateType.PreventativeAndOnTriggerCondition
                    ? 3
                    : 2,
                )}
              />
            </Grid2>
          )}
        </Grid2>
      </StepContent>
      <StepActions
        completeLabel="ticket_checklist_template.dialog.create.save"
        onBack={onBack}
        onComplete={handleComplete}
      />
    </>
  );
};
