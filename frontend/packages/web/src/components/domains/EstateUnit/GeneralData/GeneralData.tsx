import { Grid2 } from '@mui/material';
import { CheckboxField, DateField, SectionTitle, SelectField, TextField } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import {
  EstateOwnership,
  EstateUnitOwnershipType,
  EstateUnitStatus,
  EstateUnitType,
} from '@realgimm5/frontend-common/gql/types';
import { useCallback, useEffect, useMemo } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { parseAddressToString } from '../../../../utils/addressUtils';
import { parseAddressToAddressFormInput } from '../../../../utils/components/addressesField/parseAddressFragment';
import { parseFloorToFloorFormInput } from '../../../../utils/components/floorField/parseFloorFragment';
import { parseStairToStairFormInput } from '../../../../utils/stair/parseStairFragment';
import { UsageTypeField } from '../../../core/Fields/UsageType/UsageType';
import { EstateUnitGeneralDataProps } from './GeneralData.types';

export const EstateUnitGeneralData = ({ control, errors, mode, readonly, setValue }: EstateUnitGeneralDataProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const estate = useWatch({ control, name: 'estate' });
  const ownershipType = useWatch({ control, name: 'ownershipType' });
  const status = useWatch({ control, name: 'status' });
  const statusDisabled = useMemo(
    () =>
      status !== null &&
      [
        EstateUnitStatus.Cancelled,
        EstateUnitStatus.DiscontinuedMerge,
        EstateUnitStatus.DiscontinuedSplit,
        EstateUnitStatus.Returned,
        EstateUnitStatus.Sold,
        EstateUnitStatus.Transformed,
      ].includes(status),
    [status],
  );
  const ownershipTypes = useMemo(() => {
    switch (estate?.ownership) {
      case EstateOwnership.Freehold:
        return [
          EstateUnitOwnershipType.Property,
          EstateUnitOwnershipType.ThirdParties,
          EstateUnitOwnershipType.SurfaceRights,
        ];
      case EstateOwnership.Mixed:
        return Object.values(EstateUnitOwnershipType);
      case EstateOwnership.ThirdParty:
        return [EstateUnitOwnershipType.ThirdParties, EstateUnitOwnershipType.RightOfUse];
      case EstateOwnership.Leasing:
        return [EstateUnitOwnershipType.Leasing, EstateUnitOwnershipType.ThirdParties];
      default:
        return [];
    }
  }, [estate?.ownership]);

  useEffect(() => {
    if (status === EstateUnitStatus.Existing) {
      setValue('disusedDate', null);
    }
    // eslint-disable-next-line
  }, [status]);

  const handleOwnershipTypeChange = useCallback(
    (onChange: (type: EstateUnitOwnershipType | null) => void) => (value: EstateUnitOwnershipType | null) => {
      onChange(value);
      if (value !== EstateUnitOwnershipType.Property) {
        setValue('ownershipPercent', null);
      }
    },
    [setValue],
  );

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {mode === FormMode.Create && <SectionTitle value="estate_unit.section_title.general_data" />}
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="internalCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('estate_unit.field.estate_unit_code')}
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
          name="externalCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('estate_unit.field.external_estate_unit_code')}
              error={!!errors.externalCode}
              helperText={errors.externalCode?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('estate_unit.field.estate_unit_name')}
              error={!!errors.name}
              helperText={errors.name?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('estate_unit.field.address_toponymy')}
              options={(estate?.addresses ?? []).map(parseAddressToAddressFormInput)}
              getOptionKey={(option) => `${option.addressId}`}
              getOptionLabel={(option) => parseAddressToString(option, language)}
              error={!!errors.address}
              helperText={errors.address?.message}
              readonly={readonly}
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
              readonly={readonly}
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
              readonly={readonly}
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
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: mode === FormMode.Create ? 6 : 4 }}>
        <Controller
          name="estate.managementSubject.name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('estate_unit.field.management_subject')}
              error={!!errors.estate?.managementSubject}
              helperText={errors.estate?.managementSubject?.message}
              readonly={readonly}
              required
              disabled
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: mode === FormMode.Create ? 6 : 4 }}>
        <Controller
          name="estateUnitType"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('estate_unit.field.estate_unit_type')}
              options={Object.values(EstateUnitType)}
              getOptionLabel={(option) => t(`common.enum.estate_unit_type.${option}`)}
              error={!!errors.estateUnitType}
              helperText={errors.estateUnitType?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      {mode === FormMode.Edit && (
        <Grid2 size={{ xs: 12, sm: 4 }}>
          <Controller
            name="sharedArea"
            control={control}
            render={({ field }) => (
              <CheckboxField
                {...field}
                label={t('estate_unit.field.shared_area')}
                error={!!errors.sharedArea}
                helperText={errors.sharedArea?.message}
                readonly={readonly}
              />
            )}
          />
        </Grid2>
      )}
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('estate_unit.field.estate_unit_status')}
              options={
                statusDisabled
                  ? [
                      EstateUnitStatus.Cancelled,
                      EstateUnitStatus.DiscontinuedMerge,
                      EstateUnitStatus.DiscontinuedSplit,
                      EstateUnitStatus.Disused,
                      EstateUnitStatus.Existing,
                      EstateUnitStatus.Returned,
                      EstateUnitStatus.Sold,
                      EstateUnitStatus.Transformed,
                    ]
                  : [EstateUnitStatus.Disused, EstateUnitStatus.Existing]
              }
              getOptionLabel={(option) => t(`common.enum.estate_unit_status.${option}`)}
              error={!!errors.status}
              helperText={errors.status?.message}
              disabled={mode === FormMode.Create || statusDisabled}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      {mode === FormMode.Create ? (
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Controller
            name="ownershipStartDate"
            control={control}
            render={({ field }) => (
              <DateField
                {...field}
                label={t('estate_unit.field.ownership_start_date')}
                error={!!errors.ownershipStartDate}
                helperText={errors.ownershipStartDate?.message}
                readonly={readonly}
                required
              />
            )}
          />
        </Grid2>
      ) : (
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Controller
            name="disusedDate"
            control={control}
            render={({ field }) => (
              <DateField
                {...field}
                label={t('estate_unit.field.disused_date')}
                error={!!errors.disusedDate}
                helperText={errors.disusedDate?.message}
                disabled={status === EstateUnitStatus.Existing}
                readonly={readonly}
                required={status !== EstateUnitStatus.Existing}
              />
            )}
          />
        </Grid2>
      )}
      <Grid2 size={{ xs: 12, sm: mode === FormMode.Create ? 6 : 4 }}>
        <Controller
          name="ownershipType"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              onChange={handleOwnershipTypeChange(field.onChange)}
              label={t('estate_unit.field.ownership_type')}
              options={ownershipTypes}
              getOptionLabel={(option) => t(`common.enum.estate_unit_ownership_type.${option}`)}
              error={!!errors.ownershipType}
              helperText={errors.ownershipType?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      {mode === FormMode.Edit && (
        <>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="ownershipStartDate"
              control={control}
              render={({ field }) => (
                <DateField
                  {...field}
                  label={t('estate_unit.field.ownership_start_date')}
                  error={!!errors.ownershipStartDate}
                  helperText={errors.ownershipStartDate?.message}
                  readonly={readonly}
                  required
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="ownershipEndDate"
              control={control}
              render={({ field }) => (
                <DateField
                  {...field}
                  label={t('estate_unit.field.ownership_end_date')}
                  error={!!errors.ownershipEndDate}
                  helperText={errors.ownershipEndDate?.message}
                  readonly={readonly}
                />
              )}
            />
          </Grid2>
        </>
      )}
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
              readonly={readonly}
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
              readonly={readonly}
              isFor="estateUnit"
              required
            />
          )}
        />
      </Grid2>
      {mode === FormMode.Create && (
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
                readonly={readonly}
              />
            )}
          />
        </Grid2>
      )}
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
              readonly={readonly}
              multiline
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
