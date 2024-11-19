import { Grid2 } from '@mui/material';
import { CheckboxField, DateField, SectionTitle, SelectField, TextField } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { EstateUnitOwnershipType, EstateUnitStatus, EstateUnitType } from '@realgimm5/frontend-common/gql/types';
import { parseStringToDate } from '@realgimm5/frontend-common/utils';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { parseAddressToString } from '../../../../utils/addressUtils';
import { CadastralUnitEstateUnitProps } from './EstateUnit.types';

export const CadastralUnitEstateUnit = ({ control, mode, readonly }: CadastralUnitEstateUnitProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const estateUnitId = useWatch({ control, name: 'estateUnit.id' });
  const estateId = useWatch({ control, name: 'estateUnit.estate.id' });

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {mode === FormMode.Create ? (
        <>
          <SectionTitle value="cadastral_unit.section_title.estate_unit" />
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="estateUnit.internalCode"
              control={control}
              render={({ field }) => (
                <TextField {...field} label={t('cadastral_unit.field.estate_unit_code')} required disabled />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="estateUnit.externalCode"
              control={control}
              render={({ field }) => (
                <TextField {...field} label={t('cadastral_unit.field.estate_unit_external_code')} disabled />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="estateUnit.name"
              control={control}
              render={({ field }) => (
                <TextField {...field} label={t('cadastral_unit.field.estate_unit_name')} disabled />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="estateUnit.address"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={parseAddressToString(field.value, language)}
                  label={t('cadastral_unit.field.address_toponymy')}
                  required
                  disabled
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="estateUnit.subNumbering"
              control={control}
              render={({ field }) => (
                <TextField {...field} label={t('cadastral_unit.field.address_indoor_number')} disabled />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="estateUnit.stair"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value?.description}
                  label={t('cadastral_unit.field.stair')}
                  disabled
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="estateUnit.floors"
              control={control}
              render={({ field }) => (
                <SelectField
                  {...field}
                  multiple
                  label={t('cadastral_unit.field.floors')}
                  options={field.value}
                  getOptionKey={(option) => `${option.id}`}
                  getOptionLabel={(option) => `(${option.position}) ${option.name}`}
                  required
                  disabled
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="estateUnit.estate.managementSubject"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={field.value.name}
                  label={t('cadastral_unit.field.management_subject')}
                  required
                  disabled
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="estateUnit.type"
              control={control}
              render={({ field }) => (
                <SelectField
                  {...field}
                  label={t('cadastral_unit.field.estate_unit_type')}
                  options={Object.values(EstateUnitType)}
                  getOptionLabel={(option) => t(`common.enum.estate_unit_type.${option}`)}
                  required
                  disabled
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="estateUnit.sharedArea"
              control={control}
              render={({ field }) => (
                <CheckboxField {...field} label={t('cadastral_unit.field.shared_area')} disabled />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="estateUnit.status"
              control={control}
              render={({ field }) => (
                <SelectField
                  {...field}
                  label={t('cadastral_unit.field.estate_unit_status')}
                  options={Object.values(EstateUnitStatus)}
                  getOptionLabel={(option) => t(`common.enum.estate_unit_status.${option}`)}
                  required
                  disabled
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="estateUnit.disusedDate"
              control={control}
              render={({ field }) => (
                <DateField
                  {...field}
                  value={parseStringToDate(field.value)}
                  label={t('cadastral_unit.field.disused_date')}
                  disabled
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="estateUnit.ownershipType"
              control={control}
              render={({ field }) => (
                <SelectField
                  {...field}
                  label={t('cadastral_unit.field.ownership_type')}
                  options={Object.values(EstateUnitOwnershipType)}
                  getOptionLabel={(option) => t(`common.enum.estate_unit_ownership_type.${option}`)}
                  required
                  disabled
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="estateUnit.ownershipStartDate"
              control={control}
              render={({ field }) => (
                <DateField
                  {...field}
                  value={parseStringToDate(field.value)}
                  label={t('cadastral_unit.field.ownership_start_date')}
                  required
                  disabled
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="estateUnit.ownershipEndDate"
              control={control}
              render={({ field }) => (
                <DateField
                  {...field}
                  value={parseStringToDate(field.value)}
                  label={t('cadastral_unit.field.ownership_end_date')}
                  disabled
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="estateUnit.ownershipPercent"
              control={control}
              render={({ field }) => (
                <TextField {...field} type="number" label={t('cadastral_unit.field.ownership_percentage')} disabled />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Controller
              name="estateUnit.usageType.name"
              control={control}
              render={({ field }) => (
                <TextField {...field} label={t('component.estate_unit_usage_type_field.label')} disabled />
              )}
            />
          </Grid2>
          <Grid2 size={12}>
            <Controller
              name="estateUnit.notes"
              control={control}
              render={({ field }) => (
                <TextField {...field} label={t('cadastral_unit.field.notes')} multiline disabled />
              )}
            />
          </Grid2>
        </>
      ) : (
        <>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="estateUnit.internalCode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('cadastral_unit.field.estate_unit_code')}
                  link={`/app/real-estate/estate-units/${estateUnitId}`}
                  readonly={readonly}
                  required
                  disabled
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="estateUnit.name"
              control={control}
              render={({ field }) => (
                <TextField {...field} label={t('cadastral_unit.field.estate_unit_name')} readonly={readonly} disabled />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="estateUnit.type"
              control={control}
              render={({ field }) => (
                <SelectField
                  {...field}
                  label={t('cadastral_unit.field.estate_unit_type')}
                  options={Object.values(EstateUnitType)}
                  getOptionLabel={(option) => t(`common.enum.estate_unit_type.${option}`)}
                  readonly={readonly}
                  required
                  disabled
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="estateUnit.usageType.name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('component.estate_unit_usage_type_field.label')}
                  readonly={readonly}
                  disabled
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="estateUnit.status"
              control={control}
              render={({ field }) => (
                <SelectField
                  {...field}
                  label={t('cadastral_unit.field.estate_unit_status')}
                  options={Object.values(EstateUnitStatus)}
                  getOptionLabel={(option) => t(`common.enum.estate_unit_status.${option}`)}
                  readonly={readonly}
                  required
                  disabled
                />
              )}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Controller
              name="estateUnit.address"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={parseAddressToString(field.value, language)}
                  label={t('cadastral_unit.field.address_toponymy')}
                  readonly={readonly}
                  required
                  disabled
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
                  link={`/app/real-estate/estates/${estateId}`}
                  readonly={readonly}
                  required
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
                <TextField {...field} label={t('cadastral_unit.field.estate_name')} readonly={readonly} disabled />
              )}
            />
          </Grid2>
        </>
      )}
    </Grid2>
  );
};
