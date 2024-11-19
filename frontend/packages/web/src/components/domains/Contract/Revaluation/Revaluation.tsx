import { Button, Grid2 } from '@mui/material';
import {
  CheckboxField,
  CurrencyField,
  DateField,
  SectionTitle,
  SelectField,
} from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { RevaluationRateType } from '@realgimm5/frontend-common/gql/types';
import { ChangeEvent, useCallback, useState } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { getEmptyContractRevaluationFormInput } from '../../../../utils/contract/initialValues';
import { ContractRevaluationHistoriesDialog } from '../../../dialogs/Contract/RevaluationHistories/RevaluationHistories';
import { ContractRevaluationProps } from './Revaluation.types';

export const ContractRevaluation = ({ control, errors, mode, readonly, setValue }: ContractRevaluationProps) => {
  const { t } = useTranslation();
  const [isRevaluationHistoriesDialogOpen, setRevaluationHistoriesDialogOpen] = useState(false);
  const isRevaluationApplied = useWatch({ control, name: 'revaluation.isRevaluationApplied' });
  const revaluationHistories = useWatch({ control, name: 'revaluationHistories' });

  const handleCheckboxChange = useCallback(
    (_: ChangeEvent<HTMLInputElement>, checked: boolean) => {
      setValue('revaluation', getEmptyContractRevaluationFormInput(checked));
    },
    [setValue],
  );

  const handleOpenRevaluationHistoriesDialog = useCallback(() => {
    setRevaluationHistoriesDialogOpen(true);
  }, []);
  const handleCloseRevaluationHistoriesDialog = useCallback(() => {
    setRevaluationHistoriesDialogOpen(false);
  }, []);

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <SectionTitle
        actions={
          mode === FormMode.Edit ? (
            <Button variant="text" onClick={handleOpenRevaluationHistoriesDialog}>
              {t('contract.action.show_revaluation_histories')}
            </Button>
          ) : undefined
        }
        value="contract.section_title.revaluation"
      />
      {isRevaluationHistoriesDialogOpen && (
        <ContractRevaluationHistoriesDialog
          revaluationHistories={revaluationHistories}
          onClose={handleCloseRevaluationHistoriesDialog}
        />
      )}
      <Grid2 size={12}>
        <Controller
          name="revaluation.isRevaluationApplied"
          control={control}
          render={({ field }) => (
            <CheckboxField
              {...field}
              onChange={handleCheckboxChange}
              label={t('contract.field.revaluation_applied')}
              error={!!errors.revaluation?.isRevaluationApplied}
              helperText={errors.revaluation?.isRevaluationApplied?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      {isRevaluationApplied && (
        <>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="revaluation.revaluationPeriodMonths"
              control={control}
              render={({ field }) => (
                <SelectField
                  {...field}
                  label={t('contract.field.revaluation_period_months')}
                  options={[12, 24]}
                  error={!!errors.revaluation?.revaluationPeriodMonths}
                  helperText={errors.revaluation?.revaluationPeriodMonths?.message}
                  readonly={readonly}
                  required
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="revaluation.isAbsoluteRevaluationApplied"
              control={control}
              render={({ field }) => (
                <CheckboxField
                  {...field}
                  label={t('contract.field.revaluation_absolute')}
                  error={!!errors.revaluation?.isAbsoluteRevaluationApplied}
                  helperText={errors.revaluation?.isAbsoluteRevaluationApplied?.message}
                  readonly={readonly}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="revaluation.isRevaluationCalculated"
              control={control}
              render={({ field }) => (
                <CheckboxField
                  {...field}
                  label={t('contract.field.revaluation_calculated')}
                  error={!!errors.revaluation?.isRevaluationCalculated}
                  helperText={errors.revaluation?.isRevaluationCalculated?.message}
                  readonly={readonly}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="revaluation.referencePeriodStart"
              control={control}
              render={({ field }) => (
                <DateField
                  {...field}
                  label={t('contract.field.revaluation_period_start')}
                  error={!!errors.revaluation?.referencePeriodStart}
                  helperText={errors.revaluation?.referencePeriodStart?.message}
                  readonly={readonly}
                  required
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="revaluation.referencePeriodEnd"
              control={control}
              render={({ field }) => (
                <DateField
                  {...field}
                  label={t('contract.field.revaluation_period_end')}
                  error={!!errors.revaluation?.referencePeriodEnd}
                  helperText={errors.revaluation?.referencePeriodEnd?.message}
                  readonly={readonly}
                  required
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="revaluation.revaluationSharePercent"
              control={control}
              render={({ field }) => (
                <SelectField
                  {...field}
                  label={t('contract.field.revaluation_share_percent')}
                  options={[75, 100]}
                  error={!!errors.revaluation?.revaluationSharePercent}
                  helperText={errors.revaluation?.revaluationSharePercent?.message}
                  readonly={readonly}
                  required
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="revaluation.rateType"
              control={control}
              render={({ field }) => (
                <SelectField
                  {...field}
                  label={t('contract.field.revaluation_rate_type')}
                  options={Object.values(RevaluationRateType)}
                  getOptionLabel={(option) => t(`common.enum.revaluation_rate_type.${option}`)}
                  error={!!errors.revaluation?.rateType}
                  helperText={errors.revaluation?.rateType?.message}
                  readonly={readonly}
                  required
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="revaluation.baseRevaluationRate"
              control={control}
              render={({ field }) => (
                <CurrencyField
                  {...field}
                  label={t('contract.field.revaluation_base_rate')}
                  error={!!errors.revaluation?.baseRevaluationRate}
                  helperText={errors.revaluation?.baseRevaluationRate?.message}
                  readonly={readonly}
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="revaluation.nextApplicationDate"
              control={control}
              render={({ field }) => (
                <DateField
                  {...field}
                  label={t('contract.field.revaluation_next_application_date')}
                  error={!!errors.revaluation?.nextApplicationDate}
                  helperText={errors.revaluation?.nextApplicationDate?.message}
                  readonly={readonly}
                  required
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="revaluation.isBackHistoryEnabled"
              control={control}
              render={({ field }) => (
                <CheckboxField
                  {...field}
                  label={t('contract.field.revaluation_back_history')}
                  error={!!errors.revaluation?.isBackHistoryEnabled}
                  helperText={errors.revaluation?.isBackHistoryEnabled?.message}
                  readonly={readonly}
                />
              )}
            />
          </Grid2>
        </>
      )}
    </Grid2>
  );
};
