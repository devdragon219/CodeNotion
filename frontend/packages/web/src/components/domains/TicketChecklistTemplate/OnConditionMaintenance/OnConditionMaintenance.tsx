import { AddCircleOutline } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import { Alert, SecondaryTable, SectionTitle } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback, useState } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CatalogueTypeActivityFormInput } from '../../../../interfaces/FormInputs/CatalogueType';
import { CraftField } from '../../../core/Fields/Craft/Craft';
import { InterventionTypeField } from '../../../core/Fields/InterventionType/InterventionType';
import { ActivitiesDialog } from './Dialog/Dialog';
import { TicketChecklistTemplateOnConditionMaintenanceProps } from './OnConditionMaintenance.types';

export const TicketChecklistTemplateOnConditionMaintenance = ({
  control,
  errors,
  isDefinitive,
  mode,
  readonly,
}: TicketChecklistTemplateOnConditionMaintenanceProps) => {
  const { t } = useTranslation();
  const catalogueType = useWatch({ control, name: 'catalogueType' });
  const { fields, remove, replace } = useFieldArray({ control, name: 'onCondition.activities' });
  const [isActivitiesDialogOpen, setActivitiesDialogOpen] = useState(false);

  const handleOpenActivitiesDialog = useCallback(() => {
    setActivitiesDialogOpen(true);
  }, []);
  const handleCloseActivitiesDialog = useCallback(() => {
    setActivitiesDialogOpen(false);
  }, []);
  const handleSaveActivities = useCallback(
    (activities: CatalogueTypeActivityFormInput[]) => {
      replace(activities);
      handleCloseActivitiesDialog();
    },
    [handleCloseActivitiesDialog, replace],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <SectionTitle value="ticket_checklist_template.section_title.on_condition_maintenance" />
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="onCondition.interventionType"
          control={control}
          render={({ field }) => (
            <InterventionTypeField
              {...field}
              label={t('ticket_checklist_template.field.intervention_type')}
              error={!!errors.onCondition?.interventionType}
              helperText={errors.onCondition?.interventionType?.message}
              disabled={isDefinitive}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="onCondition.craft"
          control={control}
          render={({ field }) => (
            <CraftField
              {...field}
              label={t('ticket_checklist_template.field.craft')}
              error={!!errors.onCondition?.craft}
              helperText={errors.onCondition?.craft?.message}
              disabled={isDefinitive}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      {mode === FormMode.Edit && (
        <>
          {isActivitiesDialogOpen && (
            <ActivitiesDialog
              activities={fields}
              catalogueType={catalogueType}
              onClose={handleCloseActivitiesDialog}
              onSave={handleSaveActivities}
            />
          )}
          <SectionTitle
            actions={
              readonly ? undefined : (
                <Button
                  color="secondary"
                  variant="contained"
                  startIcon={<AddCircleOutline />}
                  onClick={handleOpenActivitiesDialog}
                >
                  {t('ticket_checklist_template.action.add_activities')}
                </Button>
              )
            }
            value="ticket_checklist_template.section_title.activities"
          />
          {errors.onCondition?.activities?.message && (
            <Grid2 size={12}>
              <Alert severity="error" message={errors.onCondition.activities.message} />
            </Grid2>
          )}
          <Grid2 size={12}>
            <SecondaryTable
              columns={[
                'ticket_checklist_template.field.activity_type',
                'ticket_checklist_template.field.activity_name',
                'ticket_checklist_template.field.activity_mandatory_by_law',
              ]}
              rows={fields.map((entry) => [
                t(`common.enum.catalogue_type_activity_type.${entry.activityType!}`),
                entry.name,
                entry.isMandatoryByLaw,
              ])}
              onRowDelete={readonly ? undefined : remove}
            />
          </Grid2>
        </>
      )}
    </Grid2>
  );
};
