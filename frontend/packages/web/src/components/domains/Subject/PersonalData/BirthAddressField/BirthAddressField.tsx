import { Grid2 } from '@mui/material';
import { TextField } from '@realgimm5/frontend-common/components';
import { useCallback } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CityFieldValue } from '../../../../../interfaces/FieldValues/City';
import { getEmptyCityFieldValue } from '../../../../../utils/components/addressesField/initialValues';
import { CityField } from '../../../../core/Fields/City/City';
import { CountryISOField } from '../../../../core/Fields/CountryISO/CountryISO';
import { BirthAddressFieldProps } from './BirthAddressField.types';

export const BirthAddressField = ({ control, errors, readonly, required, setValue }: BirthAddressFieldProps) => {
  const { t } = useTranslation();
  const countryISO = useWatch({ control, name: 'birthLocation.countryISO' });
  const city = useWatch({ control, name: 'birthLocation.city' });

  const handleCountryISOChange = useCallback(
    (onChange: (value: string | null) => void) => (value: string | null) => {
      onChange(value);

      setValue('birthLocation.city', getEmptyCityFieldValue());
      setValue('birthLocation.countyName', '');
    },
    [setValue],
  );

  const handleCityChange = useCallback(
    (onChange: (value: CityFieldValue | null) => void) => (value: CityFieldValue | null) => {
      onChange(value ?? getEmptyCityFieldValue());

      if (value?.countyName.length !== 0) {
        setValue(`birthLocation.countyName`, value!.countyName);
      } else {
        setValue(`birthLocation.countyName`, '');
      }
    },
    [setValue],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="birthLocation.countryISO"
          control={control}
          render={({ field }) => (
            <CountryISOField
              {...field}
              onChange={handleCountryISOChange(field.onChange)}
              label={t('subject.field.birth_address_country')}
              error={!!errors.birthLocation?.countryISO}
              helperText={errors.birthLocation?.countryISO?.message}
              required={required}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="birthLocation.city"
          control={control}
          render={({ field }) => (
            <CityField
              {...field}
              onChange={handleCityChange(field.onChange)}
              label={t('subject.field.address_city')}
              error={!!errors.birthLocation?.city?.name}
              helperText={errors.birthLocation?.city?.name?.message}
              required={required}
              readonly={readonly}
              countryISO={countryISO}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="birthLocation.countyName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('subject.field.birth_address_county')}
              error={!!errors.birthLocation?.countyName}
              helperText={errors.birthLocation?.countyName?.message}
              disabled={!countryISO || city.countyName.length !== 0}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
