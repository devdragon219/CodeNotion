import { Grid2 } from '@mui/material';
import { CheckboxField, DateField, SectionTitle, SelectField, TextField } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { CadastralUnitStatus, EstateUnitType } from '@realgimm5/frontend-common/gql/types';
import { useEffect, useMemo } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { getCountryName, getSortedCountryCodes } from '../../../../utils/countryUtils';
import { CadastralUnitGeneralDataProps } from './GeneralData.types';

export const CadastralUnitGeneralData = ({
  control,
  errors,
  mode,
  readonly,
  setValue,
}: CadastralUnitGeneralDataProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const status = useWatch({ control, name: 'status' });
  const statusDisabled = useMemo(
    () =>
      status !== null &&
      [
        CadastralUnitStatus.Changed,
        CadastralUnitStatus.DiscontinuedMerge,
        CadastralUnitStatus.DiscontinuedSplit,
        CadastralUnitStatus.Transformed,
      ].includes(status),
    [status],
  );

  useEffect(() => {
    if (status === CadastralUnitStatus.Existing) {
      setValue('until', null);
    }
    // eslint-disable-next-line
  }, [status]);

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {mode === FormMode.Create && <SectionTitle value="cadastral_unit.section_title.general_data" />}
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="internalCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('cadastral_unit.field.cadastral_unit_code')}
              error={!!errors.internalCode}
              helperText={errors.internalCode?.message}
              readonly={readonly}
              required
              disabled
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="estateUnit.type"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('cadastral_unit.field.cadastral_unit_type')}
              options={Object.values(EstateUnitType)}
              getOptionLabel={(option) => t(`common.enum.estate_unit_type.${option}`)}
              readonly={readonly}
              disabled
            />
          )}
        />
      </Grid2>
      {mode === FormMode.Edit && (
        <>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <SelectField
                  {...field}
                  label={t('cadastral_unit.field.cadastral_unit_status')}
                  options={
                    statusDisabled
                      ? [
                          CadastralUnitStatus.Cancelled,
                          CadastralUnitStatus.Changed,
                          CadastralUnitStatus.DiscontinuedMerge,
                          CadastralUnitStatus.DiscontinuedSplit,
                          CadastralUnitStatus.Existing,
                          CadastralUnitStatus.Transformed,
                        ]
                      : [CadastralUnitStatus.Cancelled, CadastralUnitStatus.Existing]
                  }
                  getOptionLabel={(option) => t(`common.enum.cadastral_unit_status.${option}`)}
                  error={!!errors.status}
                  helperText={errors.status?.message}
                  readonly={readonly}
                  disabled={statusDisabled}
                  required
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="since"
              control={control}
              render={({ field }) => (
                <DateField
                  {...field}
                  label={t('cadastral_unit.field.since')}
                  error={!!errors.since}
                  helperText={errors.since?.message}
                  readonly={readonly}
                  required
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="until"
              control={control}
              render={({ field }) => (
                <DateField
                  {...field}
                  label={t('cadastral_unit.field.until')}
                  error={!!errors.until}
                  helperText={errors.until?.message}
                  readonly={readonly}
                  disabled={status === CadastralUnitStatus.Existing}
                  required={status !== CadastralUnitStatus.Existing}
                />
              )}
            />
          </Grid2>
        </>
      )}
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="address.countryISO"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('cadastral_unit.field.address_country')}
              options={getSortedCountryCodes(language)}
              getOptionLabel={(countryCode) => getCountryName(countryCode, language)}
              error={!!errors.address?.countryISO}
              helperText={errors.address?.countryISO?.message}
              readonly={readonly}
              disabled
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="address.city.name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('cadastral_unit.field.address_city')}
              error={!!errors.address?.city?.name}
              helperText={errors.address?.city?.name?.message}
              readonly={readonly}
              disabled
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="address.city.countyName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('cadastral_unit.field.address_county')}
              error={!!errors.address?.city?.countyName}
              helperText={errors.address?.city?.countyName?.message}
              readonly={readonly}
              disabled
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="address.toponymy"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('cadastral_unit.field.address_toponymy')}
              error={!!errors.address?.toponymy}
              helperText={errors.address?.toponymy?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="address.numbering"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('cadastral_unit.field.address_number')}
              error={!!errors.address?.numbering}
              helperText={errors.address?.numbering?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="address.localPostCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('cadastral_unit.field.address_postal_code')}
              error={!!errors.address?.localPostCode}
              helperText={errors.address?.localPostCode?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      {mode === FormMode.Create ? (
        <>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="since"
              control={control}
              render={({ field }) => (
                <DateField
                  {...field}
                  label={t('cadastral_unit.field.since')}
                  error={!!errors.since}
                  helperText={errors.since?.message}
                  readonly={readonly}
                  required
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <SelectField
                  {...field}
                  label={t('cadastral_unit.field.cadastral_unit_status')}
                  options={[CadastralUnitStatus.Existing]}
                  getOptionLabel={(option) => t(`common.enum.cadastral_unit_status.${option}`)}
                  error={!!errors.status}
                  helperText={errors.status?.message}
                  readonly={readonly}
                  disabled
                  required
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="isAncillaryUnit"
              control={control}
              render={({ field }) => (
                <CheckboxField {...field} label={t('cadastral_unit.field.is_ancillary_unit')} readonly={readonly} />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="isCadastralRegistrationInProgress"
              control={control}
              render={({ field }) => (
                <CheckboxField
                  {...field}
                  label={t('cadastral_unit.field.is_registration_in_progress')}
                  readonly={readonly}
                />
              )}
            />
          </Grid2>
          <SectionTitle value="cadastral_unit.section_title.estate" />
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="estateUnit.estate.internalCode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('cadastral_unit.field.estate_code')}
                  error={!!errors.estateUnit?.estate?.internalCode}
                  helperText={errors.estateUnit?.estate?.internalCode?.message}
                  readonly={readonly}
                  disabled
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="estateUnit.estate.name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('cadastral_unit.field.estate_name')}
                  error={!!errors.estateUnit?.estate?.name}
                  helperText={errors.estateUnit?.estate?.name?.message}
                  readonly={readonly}
                  disabled
                />
              )}
            />
          </Grid2>
        </>
      ) : (
        <>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="isAncillaryUnit"
              control={control}
              render={({ field }) => (
                <CheckboxField {...field} label={t('cadastral_unit.field.is_ancillary_unit')} readonly={readonly} />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="isCadastralRegistrationInProgress"
              control={control}
              render={({ field }) => (
                <CheckboxField
                  {...field}
                  label={t('cadastral_unit.field.is_registration_in_progress')}
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
