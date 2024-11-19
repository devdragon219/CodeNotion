import { AddCircleOutline } from '@mui/icons-material';
import { Button, Grid2 } from '@mui/material';
import {
  Alert,
  CurrencyField,
  DateField,
  EmptyText,
  FormViewer,
  SecondaryTable,
  SectionTitle,
  TextField,
} from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { parseDateToLocalizedString } from '@realgimm5/frontend-common/utils';
import { ParseKeys } from 'i18next';
import { useCallback, useMemo, useState } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CostChargeFormInput } from '../../../../interfaces/FormInputs/CostCharge';
import { CostChargeConsumptionDialog } from './Dialog/Dialog';
import { CostChargeConsumptionField } from './Field/Field';
import { CostChargeGeneralDataProps } from './GeneralData.types';

export const CostChargeGeneralData = ({ control, errors, mode, readonly, setValue }: CostChargeGeneralDataProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const fields = useWatch({ control, name: 'fields' });
  const utilityService = useWatch({ control, name: 'utilityService' });
  const consumptions = useWatch({ control, name: 'consumptions' });
  const periodStart = useWatch({ control, name: 'periodStart' });
  const periodEnd = useWatch({ control, name: 'periodEnd' });
  const measurementUnit = useMemo(
    () => utilityService?.utilityType.measurementUnit ?? '',
    [utilityService?.utilityType.measurementUnit],
  );
  const timeOfUseRateCount = useMemo(
    () => utilityService?.utilityType.timeOfUseRateCount ?? 0,
    [utilityService?.utilityType.timeOfUseRateCount],
  );

  const [consumptionTypeDialogProp, setConsumptionTypeDialogProp] = useState<'actual' | 'expected' | null>(null);

  const handleCloseConsumptionDialog = useCallback(() => {
    setConsumptionTypeDialogProp(null);
  }, []);

  const handleOpenActualConsumption = useCallback(() => {
    setConsumptionTypeDialogProp('actual');
  }, []);
  const handleDeleteActualConsumption = useCallback(() => {
    setValue('consumptions.actual', null);
  }, [setValue]);

  const handleOpenExpectedConsumption = useCallback(() => {
    setConsumptionTypeDialogProp('expected');
  }, []);
  const handleDeleteExpectedConsumption = useCallback(() => {
    setValue('consumptions.expected', null);
  }, [setValue]);

  const handleSaveConsumption = useCallback(
    (consumptions: CostChargeFormInput['consumptions']) => {
      setValue('consumptions', consumptions);
      handleCloseConsumptionDialog();
    },
    [handleCloseConsumptionDialog, setValue],
  );

  const errorMessage = useMemo(
    () =>
      errors.consumptions?.message ??
      errors.consumptions?.actual?.since?.message ??
      errors.consumptions?.actual?.until?.message ??
      errors.consumptions?.expected?.since?.message ??
      errors.consumptions?.expected?.until?.message,
    [errors.consumptions],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {mode === FormMode.Edit && errorMessage && (
        <Grid2 size={12}>
          <Alert severity="error" message={errorMessage} />
        </Grid2>
      )}
      {consumptionTypeDialogProp && (
        <CostChargeConsumptionDialog
          input={consumptions}
          measurementUnit={measurementUnit}
          periodEnd={periodEnd}
          periodStart={periodStart}
          timeOfUseRateCount={timeOfUseRateCount}
          type={consumptionTypeDialogProp}
          onClose={handleCloseConsumptionDialog}
          onSave={handleSaveConsumption}
        />
      )}
      <SectionTitle value="cost_charge.section_title.cost_charge" />
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="totalAmount"
          control={control}
          render={({ field }) => (
            <CurrencyField
              {...field}
              label={t('cost_charge.field.total_amount')}
              error={!!errors.totalAmount}
              helperText={errors.totalAmount?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="periodStart"
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('cost_charge.field.period_start')}
              error={!!errors.periodStart}
              helperText={errors.periodStart?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="periodEnd"
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('cost_charge.field.period_end')}
              error={!!errors.periodEnd}
              helperText={errors.periodEnd?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="referenceDate"
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('cost_charge.field.reference_date')}
              error={!!errors.referenceDate}
              helperText={errors.referenceDate?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="dueDate"
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('cost_charge.field.due_date')}
              error={!!errors.dueDate}
              helperText={errors.dueDate?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="invoiceNumber"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('cost_charge.field.invoice_number')}
              error={!!errors.invoiceNumber}
              helperText={errors.invoiceNumber?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="totalVatAmount"
          control={control}
          render={({ field }) => (
            <CurrencyField
              {...field}
              label={t('cost_charge.field.vat_amount')}
              error={!!errors.totalVatAmount}
              helperText={errors.totalVatAmount?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <SectionTitle value="cost_charge.section_title.invoiced_consumption" />
      <Grid2 size={12}>
        <Controller
          name="invoicedConsumptionAmount"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label={t('cost_charge.field.invoiced_consumption_with_unit', {
                measurementUnit,
              })}
              error={!!errors.invoicedConsumptionAmount}
              helperText={errors.invoicedConsumptionAmount?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <SectionTitle value="cost_charge.section_title.actual_consumption" />
      {mode === FormMode.Create ? (
        <Grid2 size={12}>
          <CostChargeConsumptionField
            control={control}
            errors={errors}
            measurementUnit={measurementUnit}
            type="actual"
          />
        </Grid2>
      ) : consumptions.actual ? (
        <Grid2 size={12}>
          <SecondaryTable
            columns={[
              'cost_charge.field.period',
              ...consumptions.actual.values.map(
                (_, index) => t('cost_charge.field.reading_value', { index: index + 1 }) as unknown as ParseKeys,
              ),
            ]}
            rows={[
              [
                `${parseDateToLocalizedString(consumptions.actual.since, language)} - ${parseDateToLocalizedString(consumptions.actual.until, language)}`,
                ...consumptions.actual.values.map(({ value }) => [value, measurementUnit].join(' ')),
              ],
            ]}
            onRowDelete={readonly ? undefined : handleDeleteActualConsumption}
            onRowEdit={readonly ? undefined : handleOpenActualConsumption}
          />
        </Grid2>
      ) : !readonly ? (
        <Grid2 size={12}>
          <Button
            color="secondary"
            variant="contained"
            startIcon={<AddCircleOutline />}
            onClick={handleOpenActualConsumption}
          >
            {t('cost_charge.action.add_actual_consumption')}
          </Button>
        </Grid2>
      ) : (
        <EmptyText value="cost_charge.text.no_actual_consumption" />
      )}
      <SectionTitle value="cost_charge.section_title.expected_consumption" />
      {mode === FormMode.Create ? (
        <Grid2 size={12}>
          <CostChargeConsumptionField
            control={control}
            errors={errors}
            measurementUnit={measurementUnit}
            type="expected"
          />
        </Grid2>
      ) : consumptions.expected ? (
        <Grid2 size={12}>
          <SecondaryTable
            columns={[
              'cost_charge.field.period',
              ...consumptions.expected.values.map(
                (_, index) => t('cost_charge.field.reading_value', { index: index + 1 }) as unknown as ParseKeys,
              ),
            ]}
            rows={[
              [
                `${parseDateToLocalizedString(consumptions.expected.since, language)} - ${parseDateToLocalizedString(consumptions.expected.until, language)}`,
                ...consumptions.expected.values.map(({ value }) => [value, measurementUnit].join(' ')),
              ],
            ]}
            onRowDelete={readonly ? undefined : handleDeleteExpectedConsumption}
            onRowEdit={readonly ? undefined : handleOpenExpectedConsumption}
          />
        </Grid2>
      ) : !readonly ? (
        <Grid2 size={12}>
          <Button
            color="secondary"
            variant="contained"
            startIcon={<AddCircleOutline />}
            onClick={handleOpenExpectedConsumption}
          >
            {t('cost_charge.action.add_expected_consumption')}
          </Button>
        </Grid2>
      ) : (
        <EmptyText value="cost_charge.text.no_expected_consumption" />
      )}
      {fields.length !== 0 && (
        <>
          <SectionTitle value="cost_charge.section_title.other_data" />
          <Grid2 size={12}>
            <Controller
              name="fields"
              control={control}
              render={({ field }) => <FormViewer {...field} errors={errors} readonly={readonly} />}
            />
          </Grid2>
        </>
      )}
    </Grid2>
  );
};
