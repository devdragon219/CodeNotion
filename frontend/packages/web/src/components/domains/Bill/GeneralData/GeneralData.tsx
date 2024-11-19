import { Grid2 } from '@mui/material';
import { CheckboxField, DateField, SectionTitle, SelectField, TextField } from '@realgimm5/frontend-common/components';
import { BillEmissionType, BillingPeriod, PaymentType } from '@realgimm5/frontend-common/gql/types';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { parseAddressToString } from '../../../../utils/addressUtils';
import { BillGeneralDataProps } from './GeneralData.types';

export const BillGeneralData = ({ control, errors, isBillActive, readonly }: BillGeneralDataProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const contract = useWatch({ control, name: 'contract' });

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <SectionTitle value={`bill.section_title.${isBillActive ? 'active' : 'passive'}_bill`} />
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="isTemporary"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t(`bill.field.${isBillActive ? 'active' : 'passive'}_status`)}
              options={[true, false]}
              getOptionLabel={(option) => t(`bill.temporary.${option}`)}
              error={!!errors.isTemporary}
              helperText={errors.isTemporary?.message}
              readonly={readonly}
              disabled
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="year"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              maxLength={4}
              label={t('bill.field.year')}
              error={!!errors.year}
              helperText={errors.year?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="contract.managementSubjectName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('bill.field.management_subject')}
              error={!!errors.contract?.managementSubjectName}
              helperText={errors.contract?.managementSubjectName?.message}
              readonly={readonly}
              disabled
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="contract.internalCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('bill.field.contract_code')}
              error={!!errors.contract?.internalCode}
              helperText={errors.contract?.internalCode?.message}
              readonly={readonly}
              disabled
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="counterpart"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('bill.field.counterpart')}
              options={contract?.counterparts ?? []}
              getOptionKey={(option) => String(option.subjectId)}
              getOptionLabel={(option) => option.subjectName}
              error={!!errors.counterpart}
              helperText={errors.counterpart?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="contract.typeDescription"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('bill.field.contract_type')}
              error={!!errors.contract?.typeDescription}
              helperText={errors.contract?.typeDescription?.message}
              readonly={readonly}
              disabled
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="isInvoiced"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t(`bill.field.${isBillActive ? 'active' : 'passive'}_invoiced`)}
              options={[true, false]}
              getOptionLabel={(option) => t(`common.text.${option}`)}
              error={!!errors.isInvoiced}
              helperText={errors.isInvoiced?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="estateUnit"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              value={field.value?.internalCode}
              label={t('bill.field.estate_unit_code')}
              error={!!errors.estateUnit?.internalCode}
              helperText={errors.estateUnit?.internalCode?.message}
              readonly={readonly}
              disabled
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="estateUnit"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              value={parseAddressToString(field.value?.address, language)}
              label={t('bill.field.estate_unit_address')}
              error={!!errors.estateUnit?.address}
              helperText={errors.estateUnit?.address?.message}
              readonly={readonly}
              disabled
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="contractBillingPeriod"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('bill.field.billing_period')}
              options={Object.values(BillingPeriod)}
              getOptionLabel={(option) => t(`common.enum.billing_period.${option}`)}
              error={!!errors.contractBillingPeriod}
              helperText={errors.contractBillingPeriod?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="isOccupiedWithoutRight"
          control={control}
          render={({ field }) => (
            <CheckboxField
              {...field}
              label={t('bill.field.is_occupied_without_right')}
              error={!!errors.isOccupiedWithoutRight}
              helperText={errors.isOccupiedWithoutRight?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t(`bill.field.${isBillActive ? 'active' : 'passive'}_date`)}
              error={!!errors.date}
              helperText={errors.date?.message}
              readonly={readonly}
              disabled
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="since"
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t(`bill.field.since`)}
              error={!!errors.since}
              helperText={errors.since?.message}
              readonly={readonly}
              disabled
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="until"
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t(`bill.field.until`)}
              error={!!errors.until}
              helperText={errors.until?.message}
              readonly={readonly}
              disabled
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="until"
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t(`bill.field.until`)}
              error={!!errors.until}
              helperText={errors.until?.message}
              readonly={readonly}
              disabled
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="transactorPaymentType"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('bill.field.payment_type')}
              options={Object.values(PaymentType)}
              getOptionLabel={(option) => t(`common.enum.payment_type.${option}`)}
              error={!!errors.transactorPaymentType}
              helperText={errors.transactorPaymentType?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="transactor"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t(`bill.field.${isBillActive ? 'active' : 'passive'}_transactor`)}
              options={contract?.transactors ?? []}
              getOptionKey={(option) => String(option.subjectId)}
              getOptionLabel={(option) => option.subjectName}
              error={!!errors.transactor}
              helperText={errors.transactor?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="emissionType"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('bill.field.emission_type')}
              options={Object.values(BillEmissionType)}
              getOptionLabel={(option) => t(`common.enum.bill_emission_type.${option}`)}
              error={!!errors.emissionType}
              helperText={errors.emissionType?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="finalDate"
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t(`bill.field.final_date`)}
              error={!!errors.finalDate}
              helperText={errors.finalDate?.message}
              readonly={readonly}
              disabled
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
