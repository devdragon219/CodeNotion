import { Grid2 } from '@mui/material';
import { MapField, SelectField, TextField } from '@realgimm5/frontend-common/components';
import { AddressType } from '@realgimm5/frontend-common/gql/types';
import { useDebounce, useMapView } from '@realgimm5/frontend-common/hooks';
import { MapCoordinates } from '@realgimm5/frontend-common/interfaces';
import { useCallback, useMemo } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CityFieldValue } from '../../../../../interfaces/FieldValues/City';
import { getEmptyCityFieldValue } from '../../../../../utils/components/addressesField/initialValues';
import { CityField } from '../../City/City';
import { CountryISOField } from '../../CountryISO/CountryISO';
import { AddressFieldProps } from './Field.types';

export const AddressField = ({
  control,
  errors,
  index,
  readonly,
  required,
  useAddressType,
  useMap = false,
  setValue,
}: AddressFieldProps) => {
  const { t } = useTranslation();
  const countryISO = useWatch({ control, name: `addresses.${index}.countryISO` });
  const city = useWatch({ control, name: `addresses.${index}.city` });
  const toponymy = useWatch({ control, name: `addresses.${index}.toponymy` });
  const numbering = useWatch({ control, name: `addresses.${index}.numbering` });
  const coordinates = useWatch({ control, name: `addresses.${index}.coordinates` });

  const debouncedCountryISO = useDebounce(countryISO);
  const debouncedCity = useDebounce(city);
  const debouncedToponymy = useDebounce(toponymy);
  const debouncedNumbering = useDebounce(numbering);

  const handleCountryISOChange = useCallback(
    (onChange: (value: string | null) => void) => (value: string | null) => {
      onChange(value);

      setValue(`addresses.${index}.city`, getEmptyCityFieldValue());
      setValue(`addresses.${index}.countyName`, '');
      setValue(`addresses.${index}.toponymy`, '');
      setValue(`addresses.${index}.numbering`, '');
      setValue(`addresses.${index}.localPostCode`, '');
      setValue(`addresses.${index}.coordinates`, null);
      setValue(`addresses.${index}.addressCoordinates`, null);
    },
    [index, setValue],
  );

  const handleCityChange = useCallback(
    (onChange: (value: CityFieldValue | null) => void) => (value: CityFieldValue | null) => {
      onChange(value ?? getEmptyCityFieldValue());

      if (value?.countyName.length !== 0) {
        setValue(`addresses.${index}.countyName`, value!.countyName);
      } else {
        setValue(`addresses.${index}.countyName`, '');
      }

      setValue(`addresses.${index}.toponymy`, '');
      setValue(`addresses.${index}.numbering`, '');
      setValue(`addresses.${index}.localPostCode`, '');
      setValue(`addresses.${index}.coordinates`, null);
      setValue(`addresses.${index}.addressCoordinates`, null);
    },
    [index, setValue],
  );

  const handleToponymyChange = useCallback(
    (onChange: (value: string | null) => void) => (value: string | null) => {
      onChange(value ?? '');
      setValue(`addresses.${index}.coordinates`, null);
      setValue(`addresses.${index}.addressCoordinates`, null);
    },
    [index, setValue],
  );

  const handleNumberingChange = useCallback(
    (onChange: (value: string | null) => void) => (value: string | null) => {
      onChange(value ?? '');
      setValue(`addresses.${index}.coordinates`, null);
      setValue(`addresses.${index}.addressCoordinates`, null);
    },
    [index, setValue],
  );

  const handlePositionChange = useCallback(
    (coordinates: MapCoordinates | null, addressCoordinates: MapCoordinates | null) => {
      setValue(`addresses.${index}.coordinates`, coordinates);
      setValue(`addresses.${index}.addressCoordinates`, addressCoordinates);
    },
    [index, setValue],
  );

  const handleMarkerDragEnd = useCallback(
    (coordinates: MapCoordinates) => {
      setValue(`addresses.${index}.coordinates`, coordinates);
      setValue(`addresses.${index}.addressCoordinates`, null);
    },
    [index, setValue],
  );

  const { mapView } = useMapView(
    debouncedCountryISO,
    debouncedCity.name,
    debouncedToponymy,
    debouncedNumbering,
    coordinates,
    handlePositionChange,
  );

  const hasCityName = useMemo(() => city.name.length !== 0, [city.name]);

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {useAddressType && (
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Controller
            name={`addresses.${index}.addressType`}
            control={control}
            render={({ field }) => (
              <SelectField
                {...field}
                value={field.value as AddressType}
                label={t('subject.field.address_type')}
                options={Object.values(AddressType)}
                getOptionLabel={(type) => t(`common.enum.address_type.${type}`)}
                error={!!errors.addresses?.[index]?.addressType}
                helperText={errors.addresses?.[index]?.addressType?.message}
                required
                readonly={readonly}
              />
            )}
          />
        </Grid2>
      )}
      <Grid2 size={{ xs: 12, sm: useAddressType ? 6 : 4 }}>
        <Controller
          name={`addresses.${index}.countryISO`}
          control={control}
          render={({ field }) => (
            <CountryISOField
              {...field}
              onChange={handleCountryISOChange(field.onChange)}
              label={t('subject.field.address_country')}
              error={!!errors.addresses?.[index]?.countryISO}
              helperText={errors.addresses?.[index]?.countryISO?.message}
              required={required}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: useAddressType ? 6 : 4 }}>
        <Controller
          name={`addresses.${index}.city`}
          control={control}
          render={({ field }) => (
            <CityField
              {...field}
              onChange={handleCityChange(field.onChange)}
              label={t('subject.field.address_city')}
              error={!!errors.addresses?.[index]?.city?.name}
              helperText={errors.addresses?.[index]?.city?.name?.message}
              required={required}
              readonly={readonly}
              countryISO={countryISO}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: useAddressType ? 6 : 4 }}>
        <Controller
          name={`addresses.${index}.countyName`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('subject.field.address_county')}
              error={!!errors.addresses?.[index]?.countyName}
              helperText={errors.addresses?.[index]?.countyName?.message}
              disabled={!countryISO || city.countyName.length !== 0}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name={`addresses.${index}.toponymy`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              onChange={handleToponymyChange(field.onChange)}
              label={t('subject.field.address_toponymy')}
              error={!!errors.addresses?.[index]?.toponymy}
              helperText={errors.addresses?.[index]?.toponymy?.message}
              disabled={!hasCityName}
              required={required}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 3 }}>
        <Controller
          name={`addresses.${index}.numbering`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              onChange={handleNumberingChange(field.onChange)}
              label={t('subject.field.address_number')}
              error={!!errors.addresses?.[index]?.numbering}
              helperText={errors.addresses?.[index]?.numbering?.message}
              disabled={!hasCityName}
              required={required}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 3 }}>
        <Controller
          name={`addresses.${index}.localPostCode`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('subject.field.address_postal_code')}
              error={!!errors.addresses?.[index]?.localPostCode}
              helperText={errors.addresses?.[index]?.localPostCode?.message}
              disabled={!hasCityName}
              required={required}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={12}>
        <Controller
          name={`addresses.${index}.notes`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('subject.field.address_notes')}
              error={!!errors.addresses?.[index]?.notes}
              helperText={errors.addresses?.[index]?.notes?.message}
              multiline
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      {useMap && (
        <Grid2 size={12}>
          <MapField height={500} mapView={mapView} onMarkerDragEnd={handleMarkerDragEnd} readonly={readonly} />
        </Grid2>
      )}
    </Grid2>
  );
};
