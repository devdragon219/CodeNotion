import { Grid2 } from '@mui/material';
import { DateField, SectionTitle, SelectField, TextField } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { useEffect } from 'react';
import { Control, Controller, UseFormSetValue, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useCadastralUnit } from '../../../../hooks/useCadastralUnit';
import { CadastralUnitFormInput } from '../../../../interfaces/FormInputs/CadastralUnit';
import { getCountryName, getSortedCountryCodes } from '../../../../utils/countryUtils';
import { CadastralUnitIncome } from '../../CadastralUnit/Income/Income';
import { CadastralUnitInspection } from '../../CadastralUnit/Inspection/Inspection';
import { EstateUnitActionCadastralUnitProps } from './CadastralUnit.types';

export const EstateUnitActionCadastralUnit = ({
  control,
  errors,
  estateUnitInternalCode,
  setValue,
}: EstateUnitActionCadastralUnitProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { getInternalCodeByEstateUnitInternalCode } = useCadastralUnit();
  const internalCode = useWatch({ control, name: 'internalCode' });

  useEffect(() => {
    if (internalCode === '') {
      getInternalCodeByEstateUnitInternalCode(estateUnitInternalCode, (internalCode) => {
        setValue('internalCode', internalCode);
      });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <SectionTitle value="cadastral_unit.section_title.general_data" />
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
              required
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
              label={t('cadastral_unit.field.since')}
              error={!!errors.since}
              helperText={errors.since?.message}
              required
            />
          )}
        />
      </Grid2>
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
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={12}>
        <CadastralUnitInspection
          control={control as unknown as Control<CadastralUnitFormInput>}
          deletable={false}
          errors={errors}
          mode={FormMode.Create}
          setValue={setValue as unknown as UseFormSetValue<CadastralUnitFormInput>}
        />
      </Grid2>
      <Grid2 size={12}>
        <CadastralUnitIncome
          control={control as unknown as Control<CadastralUnitFormInput>}
          errors={errors}
          mode={FormMode.Create}
        />
      </Grid2>
    </Grid2>
  );
};
