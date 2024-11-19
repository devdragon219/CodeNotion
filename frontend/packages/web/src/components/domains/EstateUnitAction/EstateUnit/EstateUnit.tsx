import { Grid2 } from '@mui/material';
import { CheckboxField, DateField, SectionTitle, SelectField, TextField } from '@realgimm5/frontend-common/components';
import { EstateUnitOwnershipType, EstateUnitType } from '@realgimm5/frontend-common/gql/types';
import { useCallback, useEffect } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useEstateUnit } from '../../../../hooks/useEstateUnit';
import { AddressFormInput } from '../../../../interfaces/FormInputs/Addresses';
import { CadastralUnitFormInput } from '../../../../interfaces/FormInputs/CadastralUnit';
import { parseAddressToString } from '../../../../utils/addressUtils';
import { copyAddressFormInput } from '../../../../utils/components/addressesField/copyAddressFormInput';
import { parseAddressToAddressFormInput } from '../../../../utils/components/addressesField/parseAddressFragment';
import { parseFloorToFloorFormInput } from '../../../../utils/components/floorField/parseFloorFragment';
import { parseStairToStairFormInput } from '../../../../utils/stair/parseStairFragment';
import { UsageTypeField } from '../../../core/Fields/UsageType/UsageType';
import { EstateUnitActionEstateUnitProps } from './EstateUnit.types';

export const EstateUnitActionEstateUnit = ({
  alreadyInUseInternalCodes = [],
  control,
  errors,
  estateId,
  setValue,
}: EstateUnitActionEstateUnitProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const { getInternalCodeByAlreadyInUseInternalCodes } = useEstateUnit();
  const estate = useWatch({ control, name: 'estate' });
  const cadastralUnit = useWatch({ control, name: 'cadastralUnit' });
  const ownershipType = useWatch({ control, name: 'ownershipType' });
  const internalCode = useWatch({ control, name: 'internalCode' });

  useEffect(() => {
    if (internalCode === '') {
      getInternalCodeByAlreadyInUseInternalCodes(estateId, alreadyInUseInternalCodes, (internalCode) => {
        setValue('internalCode', internalCode);
      });
    }
    // eslint-disable-next-line
  }, []);

  const setCadastralUnitValue = useCallback(
    (key: string, value: unknown) => {
      if (cadastralUnit) {
        setValue('cadastralUnit', {
          ...cadastralUnit,
          [key]: value,
        } as CadastralUnitFormInput);
      }
    },
    [cadastralUnit, setValue],
  );

  const handleAddressChange = useCallback(
    (onChange: (address: AddressFormInput | null) => void) => (value: AddressFormInput | null) => {
      onChange(value);
      setCadastralUnitValue('address', copyAddressFormInput(value));
    },
    [setCadastralUnitValue],
  );

  const handleEstateUnitTypeChange = useCallback(
    (onChange: (address: EstateUnitType | null) => void) => (value: EstateUnitType | null) => {
      onChange(value);
      setCadastralUnitValue('cadastralUnitType', value);
    },
    [setCadastralUnitValue],
  );

  const handleOwnershipTypeChange = useCallback(
    (onChange: (type: EstateUnitOwnershipType | null) => void) => (value: EstateUnitOwnershipType | null) => {
      onChange(value);
      if (value !== EstateUnitOwnershipType.Property) {
        setValue('ownershipPercent', null);
      }
    },
    [setValue],
  );

  const handleOwnershipStartDateChange = useCallback(
    (onChange: (type: Date | null) => void) => (value: Date | null) => {
      onChange(value);
      setCadastralUnitValue('since', value);
    },
    [setCadastralUnitValue],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <SectionTitle value="estate_unit.section_title.estate_unit_general_data" />
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="internalCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('estate_unit.field.estate_unit_code')}
              error={!!errors.internalCode}
              helperText={errors.internalCode?.message}
              required
              disabled
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('estate_unit.field.estate_unit_name')}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              onChange={handleAddressChange(field.onChange)}
              label={t('estate_unit.field.address_toponymy')}
              options={(estate?.addresses ?? []).map(parseAddressToAddressFormInput)}
              getOptionKey={(option) => `${option.addressId}`}
              getOptionLabel={(option) => parseAddressToString(option, language)}
              error={!!errors.address}
              helperText={errors.address?.message}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="subNumbering"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('estate_unit.field.address_indoor_number')}
              error={!!errors.subNumbering}
              helperText={errors.subNumbering?.message}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="stair"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('estate_unit.field.stair')}
              options={(estate?.stairs ?? []).map(parseStairToStairFormInput)}
              getOptionKey={(option) => `${option.stairId}`}
              getOptionLabel={(option) => option.description}
              error={!!errors.stair}
              helperText={errors.stair?.message}
              disabled={(estate?.stairs ?? []).length === 0}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="floors"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              multiple
              label={t('estate_unit.field.floors')}
              options={(estate?.floors ?? []).map(parseFloorToFloorFormInput)}
              getOptionKey={(option) => `${option.floorId}`}
              getOptionLabel={(option) => `(${option.position}) ${option.name}`}
              error={!!errors.floors}
              helperText={errors.floors?.message}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="estateUnitType"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              onChange={handleEstateUnitTypeChange(field.onChange)}
              label={t('estate_unit.field.estate_unit_type')}
              options={Object.values(EstateUnitType)}
              getOptionLabel={(option) => t(`common.enum.estate_unit_type.${option}`)}
              error={!!errors.estateUnitType}
              helperText={errors.estateUnitType?.message}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="sharedArea"
          control={control}
          render={({ field }) => (
            <CheckboxField
              {...field}
              label={t('estate_unit.field.shared_area')}
              error={!!errors.sharedArea}
              helperText={errors.sharedArea?.message}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="ownershipType"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              onChange={handleOwnershipTypeChange(field.onChange)}
              label={t('estate_unit.field.ownership_type')}
              options={Object.values(EstateUnitOwnershipType)}
              getOptionLabel={(option) => t(`common.enum.estate_unit_ownership_type.${option}`)}
              error={!!errors.ownershipType}
              helperText={errors.ownershipType?.message}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="ownershipStartDate"
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              onChange={handleOwnershipStartDateChange(field.onChange)}
              label={t('estate_unit.field.ownership_start_date')}
              error={!!errors.ownershipStartDate}
              helperText={errors.ownershipStartDate?.message}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="ownershipPercent"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              maxLength={3}
              label={t('estate_unit.field.ownership_percentage')}
              error={!!errors.ownershipPercent}
              helperText={errors.ownershipPercent?.message}
              disabled={ownershipType !== EstateUnitOwnershipType.Property}
              required={ownershipType === EstateUnitOwnershipType.Property}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="usageType"
          control={control}
          render={({ field }) => (
            <UsageTypeField
              {...field}
              label={t('component.estate_unit_usage_type_field.label')}
              error={!!errors.usageType}
              helperText={errors.usageType?.message}
              isFor="estateUnit"
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
              label={t('estate_unit.field.notes')}
              error={!!errors.notes}
              helperText={errors.notes?.message}
              multiline
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
