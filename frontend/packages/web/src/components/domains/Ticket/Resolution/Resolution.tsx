import { Grid2 } from '@mui/material';
import { DateField, SectionTitle, TextField, TimeField } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { TicketMainType, TicketMasterStatus } from '@realgimm5/frontend-common/gql/types';
import { useMemo } from 'react';
import { Control, Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { WorkersFieldValues } from '../../../../interfaces/FormInputs/Worker';
import { Workers } from '../../Worker/Workers';
import { TicketResolutionProps } from './Resolution.types';

export const TicketResolution = ({ control, errors, isSupplier, readonly }: TicketResolutionProps) => {
  const { t } = useTranslation();
  const mainType = useWatch({ control, name: 'mainType' });
  const status = useWatch({ control, name: 'masterStatus' });

  const isTicket = useMemo(() => [TicketMainType.Issue, TicketMainType.IssueParent].includes(mainType), [mainType]);

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <SectionTitle value={`ticket.section_title.${isTicket ? '' : 'checklist_'}resolution`} />
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="resolution.interventionStart"
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('ticket.field.resolution_start_date')}
              error={!!errors.resolution?.interventionStart}
              helperText={errors.resolution?.interventionStart?.message}
              readonly={readonly}
              disabled={!isSupplier || status !== TicketMasterStatus.Resolved}
              required={isSupplier}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="resolution.interventionStart"
          control={control}
          render={({ field }) => (
            <TimeField
              {...field}
              label={t('ticket.field.resolution_start_time')}
              readonly={readonly}
              disabled={!isSupplier || status !== TicketMasterStatus.Resolved}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="resolution.interventionEnd"
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('ticket.field.resolution_end_date')}
              error={!!errors.resolution?.interventionEnd}
              helperText={errors.resolution?.interventionEnd?.message}
              readonly={readonly}
              disabled={!isSupplier || status !== TicketMasterStatus.Resolved}
              required={isSupplier}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="resolution.interventionEnd"
          control={control}
          render={({ field }) => (
            <TimeField
              {...field}
              label={t('ticket.field.resolution_end_time')}
              readonly={readonly}
              disabled={!isSupplier || status !== TicketMasterStatus.Resolved}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: isTicket ? 6 : 12 }}>
        <Controller
          name="resolution.closure"
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t(`ticket.field.resolution_${isTicket ? 'closure_date' : 'checklist_closure'}`)}
              error={!!errors.resolution?.closure}
              helperText={errors.resolution?.closure?.message}
              readonly={readonly}
              disabled={!isSupplier || status !== TicketMasterStatus.Resolved}
              required={isSupplier}
            />
          )}
        />
      </Grid2>
      {isTicket && (
        <>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="resolution.closure"
              control={control}
              render={({ field }) => (
                <TimeField
                  {...field}
                  label={t('ticket.field.resolution_closure_time')}
                  readonly={readonly}
                  disabled={!isSupplier || status !== TicketMasterStatus.Resolved}
                />
              )}
            />
          </Grid2>
          <Grid2 size={12}>
            <Controller
              name="resolution.operationsPerformed"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  multiline
                  label={t('ticket.field.resolution_operations_performed')}
                  error={!!errors.resolution?.operationsPerformed}
                  helperText={errors.resolution?.operationsPerformed?.message}
                  readonly={readonly}
                  disabled={!isSupplier || status !== TicketMasterStatus.Resolved}
                />
              )}
            />
          </Grid2>
        </>
      )}
      <Grid2 size={12}>
        <Controller
          name="resolution.diagnosis"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              multiline
              label={t('ticket.field.resolution_diagnosis')}
              error={!!errors.resolution?.diagnosis}
              helperText={errors.resolution?.diagnosis?.message}
              readonly={readonly}
              disabled={!isSupplier || status !== TicketMasterStatus.Resolved}
            />
          )}
        />
      </Grid2>
      {isTicket && (
        <Grid2 size={12}>
          <Controller
            name="resolution.partsAndSupplies"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                multiline
                label={t('ticket.field.resolution_parts_and_supplies')}
                error={!!errors.resolution?.partsAndSupplies}
                helperText={errors.resolution?.partsAndSupplies?.message}
                readonly={readonly}
                disabled={!isSupplier || status !== TicketMasterStatus.Resolved}
              />
            )}
          />
        </Grid2>
      )}
      <Grid2 size={12}>
        <Controller
          name="resolution.notes"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              multiline
              label={t(`ticket.field.resolution${isTicket ? '' : '_checklist'}_notes`)}
              error={!!errors.resolution?.notes}
              helperText={errors.resolution?.notes?.message}
              readonly={readonly}
              disabled={!isSupplier || status !== TicketMasterStatus.Resolved}
            />
          )}
        />
      </Grid2>
      {isTicket && (
        <Grid2 size={12}>
          <Workers
            control={control as unknown as Control<WorkersFieldValues>}
            errors={errors}
            readonly={readonly || !isSupplier || status !== TicketMasterStatus.Resolved}
            mode={FormMode.Edit}
          />
        </Grid2>
      )}
    </Grid2>
  );
};
