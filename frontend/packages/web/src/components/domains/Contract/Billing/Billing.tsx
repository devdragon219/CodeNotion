import { Button, Grid2 } from '@mui/material';
import {
  CheckboxField,
  CurrencyField,
  DateField,
  SectionTitle,
  SelectField,
  TextField,
} from '@realgimm5/frontend-common/components';
import { DEFAULT_BORDER_RADIUS } from '@realgimm5/frontend-common/configs';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { AutomaticBoolean, BillingPeriod, VatRateType } from '@realgimm5/frontend-common/gql/types';
import { parseStringToDate, parseStringToLocalizedDate } from '@realgimm5/frontend-common/utils';
import { isBefore } from 'date-fns';
import { ParseKeys } from 'i18next';
import { useCallback, useMemo, useState } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { calcContractBillingInstallment } from '../../../../utils/contract/calcContractBillingInstallment';
import { BillItemTypeField } from '../../../core/Fields/BillItemType/BillItemType';
import { ContractBillingPausesDialog } from '../../../dialogs/Contract/BillingPauses/BillingPauses';
import { ContractBillingProps } from './Billing.types';

export const ContractBilling = ({ control, errors, mode, readonly }: ContractBillingProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const [isBillingPausesDialogOpen, setBillingPausesDialogOpen] = useState(false);
  const appliesBaseFee = useWatch({ control, name: 'billing.appliesBaseFee' });
  const baseFee = useWatch({ control, name: 'billing.baseFee' });
  const period = useWatch({ control, name: 'billing.period' });
  const pauses = useWatch({ control, name: 'billing.pauses' });

  const billingPause = useMemo(
    () =>
      pauses.find((billingPause) => {
        const until = parseStringToDate(billingPause.until);
        if (!until || isBefore(new Date(), until)) {
          return true;
        }
        return false;
      }),
    [pauses],
  );
  const installment = useMemo(() => calcContractBillingInstallment(baseFee, period), [baseFee, period]);

  const handleOpenBillingPausesDialog = useCallback(() => {
    setBillingPausesDialogOpen(true);
  }, []);
  const handleCloseBillingPausesDialog = useCallback(() => {
    setBillingPausesDialogOpen(false);
  }, []);

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {mode === FormMode.Edit && billingPause && (
        <SectionTitle
          sx={(theme) => ({
            justifyContent: 'center',
            p: 3,
            borderRadius: `${DEFAULT_BORDER_RADIUS}px`,
            border: `1px solid ${theme.palette.danger[300]}`,
          })}
          value={
            t(`contract.text.billing_${billingPause.until ? 'resumed' : 'paused'}`, {
              since: parseStringToLocalizedDate(billingPause.since, language),
              until: parseStringToLocalizedDate(billingPause.until, language),
            }) as unknown as ParseKeys
          }
        />
      )}
      <SectionTitle
        actions={
          mode === FormMode.Edit ? (
            <Button variant="text" onClick={handleOpenBillingPausesDialog}>
              {t('contract.action.show_billing_pauses')}
            </Button>
          ) : undefined
        }
        value="contract.section_title.billing"
      />
      {isBillingPausesDialogOpen && (
        <ContractBillingPausesDialog billingPauses={pauses} onClose={handleCloseBillingPausesDialog} />
      )}
      <Grid2 size={{ xs: 12, sm: mode === FormMode.Create ? 4 : 6 }}>
        <Controller
          name="billing.startDate"
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('contract.field.billing_start_date')}
              error={!!errors.billing?.startDate}
              helperText={errors.billing?.startDate?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      {mode === FormMode.Edit && (
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Controller
            name="billing.endDate"
            control={control}
            render={({ field }) => (
              <DateField
                {...field}
                label={t('contract.field.billing_end_date')}
                error={!!errors.billing?.endDate}
                helperText={errors.billing?.endDate?.message}
                readonly={readonly}
              />
            )}
          />
        </Grid2>
      )}
      {mode === FormMode.Edit && (
        <Grid2 size={{ xs: 12, sm: 4 }}>
          <Controller
            name="billing.alignedToCalendarYear"
            control={control}
            render={({ field }) => (
              <CheckboxField
                {...field}
                label={t('contract.field.billing_align_to_calendar_year')}
                error={!!errors.billing?.alignedToCalendarYear}
                helperText={errors.billing?.alignedToCalendarYear?.message}
                readonly={readonly}
              />
            )}
          />
        </Grid2>
      )}
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="billing.afterTerm"
          control={control}
          render={({ field }) => (
            <CheckboxField
              {...field}
              label={t('contract.field.billing_after_term')}
              error={!!errors.billing?.afterTerm}
              helperText={errors.billing?.afterTerm?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="recoverBillsAfterSuspension"
          control={control}
          render={({ field }) => (
            <CheckboxField
              {...field}
              label={t('contract.field.billing_recover_after_suspension')}
              error={!!errors.recoverBillsAfterSuspension}
              helperText={errors.recoverBillsAfterSuspension?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      {mode === FormMode.Create && (
        <Grid2 size={{ xs: 12, sm: 3 }}>
          <Controller
            name="billing.alignedToCalendarYear"
            control={control}
            render={({ field }) => (
              <CheckboxField
                {...field}
                label={t('contract.field.billing_align_to_calendar_year')}
                error={!!errors.billing?.alignedToCalendarYear}
                helperText={errors.billing?.alignedToCalendarYear?.message}
                readonly={readonly}
              />
            )}
          />
        </Grid2>
      )}
      <Grid2 size={{ xs: 12, sm: mode === FormMode.Create ? 3 : 4 }}>
        <Controller
          name="billing.appliesBaseFee"
          control={control}
          render={({ field }) => (
            <CheckboxField
              {...field}
              label={t('contract.field.billing_applies_base_fee')}
              error={!!errors.billing?.appliesBaseFee}
              helperText={errors.billing?.appliesBaseFee?.message}
              readonly={readonly}
              disabled
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: mode === FormMode.Create ? 3 : 4 }}>
        <Controller
          name="billing.baseFeeBillItemType"
          control={control}
          render={({ field }) => (
            <BillItemTypeField
              {...field}
              label={t('contract.field.billing_base_fee_bill_item_type')}
              error={!!errors.billing?.baseFeeBillItemType}
              helperText={errors.billing?.baseFeeBillItemType?.message}
              readonly={readonly}
              isForContractFee
              disabled={!appliesBaseFee}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: mode === FormMode.Create ? 3 : 4 }}>
        <Controller
          name="billing.baseFee"
          control={control}
          render={({ field }) => (
            <CurrencyField
              {...field}
              label={t('contract.field.billing_base_fee')}
              error={!!errors.billing?.baseFee}
              helperText={errors.billing?.baseFee?.message}
              disabled={!appliesBaseFee}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="billing.period"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('contract.field.billing_period')}
              options={Object.values(BillingPeriod)}
              getOptionLabel={(option) => t(`common.enum.billing_period.${option}`)}
              error={!!errors.billing?.period}
              helperText={errors.billing?.period?.message}
              readonly={readonly}
              clearable
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <CurrencyField
          label={t('contract.field.billing_installment')}
          value={installment}
          readonly={readonly}
          disabled
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="billing.withStampTax"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('contract.field.billing_with_stamp_tax')}
              options={Object.values(AutomaticBoolean)}
              getOptionLabel={(option) => t(`common.enum.automatic_boolean.${option}`)}
              error={!!errors.billing?.withStampTax}
              helperText={errors.billing?.withStampTax?.message}
              readonly={readonly}
              clearable
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="billing.vatRateType"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('contract.field.billing_vat_rate_type')}
              options={Object.values(VatRateType)}
              getOptionLabel={(option) => t(`common.enum.vat_rate_type.${option}`)}
              error={!!errors.billing?.vatRateType}
              helperText={errors.billing?.vatRateType?.message}
              readonly={readonly}
              clearable
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="billing.vatRateType"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('contract.field.billing_vat_rate')}
              options={Object.values(VatRateType)}
              getOptionLabel={(option) => t(`common.enum.vat_rate.${option}`)}
              error={!!errors.billing?.vatRateType}
              helperText={errors.billing?.vatRateType?.message}
              readonly={readonly}
              disabled
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="billing.withSplitPayment"
          control={control}
          render={({ field }) => (
            <CheckboxField
              {...field}
              label={t('contract.field.billing_with_split_payment')}
              error={!!errors.billing?.withSplitPayment}
              helperText={errors.billing?.withSplitPayment?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={12}>
        <Controller
          name="notes"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              multiline
              label={t('contract.field.notes')}
              error={!!errors.notes}
              helperText={errors.notes?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={12}>
        <Controller
          name="billing.notes"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              multiline
              label={t('contract.field.billing_notes')}
              error={!!errors.billing?.notes}
              helperText={errors.billing?.notes?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
