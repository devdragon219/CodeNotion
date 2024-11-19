import { Grid2 } from '@mui/material';
import { Alert, SectionTitle, TransferList } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { CatalogueTypeActivityType } from '@realgimm5/frontend-common/gql/types';
import { useMemo } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { TicketChecklistTemplateOnConditionMaintenanceActivitiesProps } from './OnConditionMaintenanceActivities.types';

export const TicketChecklistTemplateOnConditionMaintenanceActivities = ({
  control,
  currentActivities = [],
  errors,
  mode,
}: TicketChecklistTemplateOnConditionMaintenanceActivitiesProps) => {
  const { t } = useTranslation();
  const catalogueType = useWatch({ control, name: 'catalogueType' });
  const activities = useMemo(() => {
    if (!catalogueType) return [];

    const currentActivityIds = currentActivities.map(({ activityId }) => activityId);
    return catalogueType.activities.filter(
      ({ activityId, activityType }) =>
        activityType === CatalogueTypeActivityType.OnIncident && !currentActivityIds.includes(activityId),
    );
  }, [catalogueType, currentActivities]);

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }} sx={{ height: '100%' }}>
      <SectionTitle value="ticket_checklist_template.section_title.on_condition_maintenance_activities" />
      {mode === FormMode.Edit && errors.onCondition?.activities?.message && (
        <Grid2 size={12}>
          <Alert severity="error" message={errors.onCondition.activities.message} />
        </Grid2>
      )}
      <Grid2 size={12} sx={{ height: { xs: 'calc(100% - 40px)', sm: 'calc(100% - 48px)' } }}>
        <Controller
          name="onCondition.activities"
          control={control}
          render={({ field }) => (
            <TransferList
              {...field}
              columns={[
                {
                  id: 'activityType',
                  label: 'ticket_checklist_template.field.activity_type',
                  options: Object.values(CatalogueTypeActivityType),
                  getOptionLabel: (option) =>
                    t(`common.enum.catalogue_type_activity_type.${option as CatalogueTypeActivityType}`),
                  enableColumnFilter: true,
                  enableSorting: true,
                },
                {
                  id: 'name',
                  label: 'ticket_checklist_template.field.activity_name',
                  enableColumnFilter: true,
                  enableGlobalFilter: true,
                  enableSorting: true,
                },
                {
                  id: 'isMandatoryByLaw',
                  type: 'boolean',
                  label: 'ticket_checklist_template.field.activity_mandatory_by_law',
                  enableColumnFilter: true,
                  enableSorting: true,
                },
              ]}
              empty="ticket_checklist_template.text.no_selected_activities"
              rows={activities}
              titles={{
                left: 'ticket_checklist_template.section_title.select_on_condition_maintenance_activities',
                right: 'ticket_checklist_template.section_title.selected_maintenance_activities',
              }}
              getRowId={({ activityId }) => String(activityId)}
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
