import { Grid2 } from '@mui/material';
import { CurrencyField, DateField, SectionTitle, SelectField, TextField } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { TermType } from '@realgimm5/frontend-common/gql/types';
import { getDifferenceInDays, isValidDate } from '@realgimm5/frontend-common/utils';
import { useCallback, useMemo } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { AdministrationTermGeneralDataProps } from './GeneralData.types';

export const AdministrationTermGeneralData = ({
  control,
  errors,
  mode,
  readonly,
  setValue,
}: AdministrationTermGeneralDataProps) => {
  const { t } = useTranslation();

  const watchedSince = useWatch({ control, name: 'since' });
  const watchedUntil = useWatch({ control, name: 'until' });

  const days = useMemo(() => getDifferenceInDays(watchedSince, watchedUntil), [watchedUntil, watchedSince]);
  const getName = useCallback((since: Date | null, until: Date | null) => {
    const startYear = isValidDate(since) ? since.getFullYear() : null;
    const endYear = isValidDate(until) ? until.getFullYear() : null;

    if (startYear && endYear && startYear !== endYear) return `${startYear}-${endYear}`;
    if (startYear && startYear === endYear) return `${startYear}`;

    return `${startYear ?? endYear ?? ''}`;
  }, []);

  const handleDateChange = useCallback(
    (field: 'since' | 'until') => (value: Date | null) => {
      setValue(field, value);

      const since = field === 'since' ? value : watchedSince;
      const until = field === 'until' ? value : watchedUntil;

      setValue('name', getName(since, until));
    },
    [getName, setValue, watchedSince, watchedUntil],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <SectionTitle value="administration_term.section_title.term" />
      <Grid2 size={{ xs: 12, sm: mode === FormMode.Create ? 3 : 6 }}>
        <Controller
          name="termType"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('administration_term.field.term_type')}
              options={Object.values(TermType)}
              getOptionLabel={(option) => t(`common.enum.term_type.${option}`)}
              error={!!errors.termType}
              helperText={errors.termType?.message}
              readonly={readonly}
              required
              disabled={mode === FormMode.Edit}
            />
          )}
        />
      </Grid2>
      {mode === FormMode.Edit ? (
        <>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField {...field} label={t('administration_term.field.name')} readonly={readonly} disabled />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 3 }}>
            <Controller
              name="expectedAmount"
              control={control}
              render={({ field }) => (
                <CurrencyField
                  {...field}
                  label={t('administration_term.field.expected_amount')}
                  error={!!errors.expectedAmount}
                  helperText={errors.expectedAmount?.message}
                  readonly={readonly}
                  required
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 3 }}>
            <Controller
              name="since"
              control={control}
              render={({ field }) => (
                <DateField
                  {...field}
                  label={t('administration_term.field.since')}
                  error={!!errors.since}
                  helperText={errors.since?.message}
                  readonly={readonly}
                  required
                  onChange={handleDateChange('since')}
                  disabled
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 3 }}>
            <Controller
              name="until"
              control={control}
              render={({ field }) => (
                <DateField
                  {...field}
                  label={t('administration_term.field.until')}
                  error={!!errors.until}
                  helperText={errors.until?.message}
                  readonly={readonly}
                  required
                  onChange={handleDateChange('until')}
                  disabled
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 3 }}>
            <TextField label={t('administration_term.field.days')} value={days} readonly={readonly} disabled />
          </Grid2>
        </>
      ) : (
        <>
          <Grid2 size={{ xs: 12, sm: 3 }}>
            <Controller
              name="since"
              control={control}
              render={({ field }) => (
                <DateField
                  {...field}
                  label={t('administration_term.field.since')}
                  error={!!errors.since}
                  helperText={errors.since?.message}
                  readonly={readonly}
                  required
                  onChange={handleDateChange('since')}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 3 }}>
            <Controller
              name="until"
              control={control}
              render={({ field }) => (
                <DateField
                  {...field}
                  label={t('administration_term.field.until')}
                  error={!!errors.until}
                  helperText={errors.until?.message}
                  readonly={readonly}
                  required
                  onChange={handleDateChange('until')}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 3 }}>
            <TextField label={t('administration_term.field.days')} value={days} readonly={readonly} disabled />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField {...field} label={t('administration_term.field.name')} readonly={readonly} disabled />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="expectedAmount"
              control={control}
              render={({ field }) => (
                <CurrencyField
                  {...field}
                  label={t('administration_term.field.expected_amount')}
                  error={!!errors.expectedAmount}
                  helperText={errors.expectedAmount?.message}
                  readonly={readonly}
                  required
                />
              )}
            />
          </Grid2>
        </>
      )}
    </Grid2>
  );
};
