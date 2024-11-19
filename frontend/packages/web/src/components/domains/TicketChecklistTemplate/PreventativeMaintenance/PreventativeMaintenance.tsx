import { AddCircleOutline } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import { Alert, SecondaryTable, SectionTitle, SelectField, TextField } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { PlannedPeriod } from '@realgimm5/frontend-common/gql/types';
import { useFieldArray } from '@realgimm5/frontend-common/hooks';
import { useCallback, useMemo, useState } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { SORTED_DAYS_OF_WEEK } from '../../../../configs/calendar';
import { CatalogueTypeActivityFormInput } from '../../../../interfaces/FormInputs/CatalogueType';
import { CraftField } from '../../../core/Fields/Craft/Craft';
import { InterventionTypeField } from '../../../core/Fields/InterventionType/InterventionType';
import { ActivitiesDialog } from './Dialog/Dialog';
import { TicketChecklistTemplatePreventativeMaintenanceProps } from './PreventativeMaintenance.types';

export const TicketChecklistTemplatePreventativeMaintenance = ({
  control,
  errors,
  isDefinitive,
  mode,
  readonly,
  setValue,
}: TicketChecklistTemplatePreventativeMaintenanceProps) => {
  const { t } = useTranslation();
  const catalogueType = useWatch({ control, name: 'catalogueType' });
  const plannedPeriod = useWatch({ control, name: 'preventative.plannedPeriod' });
  const daysOfWeek = useWatch({ control, name: 'preventative.daysOfWeek' });
  const { fields, remove, replace } = useFieldArray({ control, name: 'preventative.activities' });
  const [isActivitiesDialogOpen, setActivitiesDialogOpen] = useState(false);

  const handleChangePlannedPeriod = useCallback(
    (onChange: (value: PlannedPeriod | null) => void) => (value: PlannedPeriod | null) => {
      onChange(value);

      setValue('preventative.daysOfWeek', []);
    },
    [setValue],
  );

  const yearlyVisits = useMemo(() => {
    if (!plannedPeriod) return '';

    switch (plannedPeriod) {
      case PlannedPeriod.Annual:
        return 1;
      case PlannedPeriod.Bimonthly:
        return 24;
      case PlannedPeriod.Biweekly:
        return 104;
      case PlannedPeriod.Daily:
        return 365;
      case PlannedPeriod.EveryFourMonths:
        return 3;
      case PlannedPeriod.Midweek:
        return 52 * daysOfWeek.length;
      case PlannedPeriod.Monthly:
        return 12;
      case PlannedPeriod.Quarterly:
        return 4;
      case PlannedPeriod.Semiannual:
        return 2;
      case PlannedPeriod.ThriceWeekly:
        return 156;
      case PlannedPeriod.Weekly:
        return 52;
    }
  }, [daysOfWeek.length, plannedPeriod]);

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
      <SectionTitle value="ticket_checklist_template.section_title.preventative_maintenance" />
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="preventative.plannedPeriod"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              onChange={handleChangePlannedPeriod(field.onChange)}
              label={t('ticket_checklist_template.field.planned_period')}
              options={Object.values(PlannedPeriod)}
              getOptionLabel={(option) => t(`common.enum.planned_period.${option}`)}
              error={!!errors.preventative?.plannedPeriod}
              helperText={errors.preventative?.plannedPeriod?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <TextField
          value={yearlyVisits}
          label={t('ticket_checklist_template.field.yearly_visits')}
          readonly={readonly}
          disabled
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="preventative.daysOfWeek"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              multiple
              useSortedOptions={false}
              label={t('ticket_checklist_template.field.days_of_week')}
              options={SORTED_DAYS_OF_WEEK}
              getOptionLabel={(option) => t(`common.enum.day_of_week.${option}`)}
              error={!!errors.preventative?.daysOfWeek}
              helperText={errors.preventative?.daysOfWeek?.message}
              disabled={plannedPeriod !== PlannedPeriod.Midweek}
              required={plannedPeriod === PlannedPeriod.Midweek}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="preventative.toleranceDays"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label={t('ticket_checklist_template.field.tolerance_days')}
              error={!!errors.preventative?.toleranceDays}
              helperText={errors.preventative?.toleranceDays?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="preventative.interventionType"
          control={control}
          render={({ field }) => (
            <InterventionTypeField
              {...field}
              label={t('ticket_checklist_template.field.intervention_type')}
              error={!!errors.preventative?.interventionType}
              helperText={errors.preventative?.interventionType?.message}
              disabled={isDefinitive}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="preventative.craft"
          control={control}
          render={({ field }) => (
            <CraftField
              {...field}
              label={t('ticket_checklist_template.field.craft')}
              error={!!errors.preventative?.craft}
              helperText={errors.preventative?.craft?.message}
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
          {errors.preventative?.activities?.message && (
            <Grid2 size={12}>
              <Alert severity="error" message={errors.preventative.activities.message} />
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
