import { Grid2 } from '@mui/material';
import { SectionTitle, SelectField, TextField } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { EstateOwnership, EstateStatus, EstateType } from '@realgimm5/frontend-common/gql/types';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { parseAddressToString } from '../../../../utils/addressUtils';
import { EstateUnitEstateProps } from './Estate.types';

export const EstateUnitEstate = ({ control, mode, readonly }: EstateUnitEstateProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const estateId = useWatch({ control, name: 'estate.id' });

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {mode === FormMode.Create && <SectionTitle value="estate_unit.section_title.estate" />}
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="estate.internalCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              sx={
                mode === FormMode.Edit
                  ? (theme) => ({
                      '.MuiInputBase-input': {
                        color: `${theme.palette.blue['500']} !important`,
                        WebkitTextFillColor: `${theme.palette.blue['500']} !important`,
                      },
                    })
                  : undefined
              }
              label={t('estate_unit.field.estate_code')}
              link={mode === FormMode.Edit ? `/app/real-estate/estates/${estateId}` : undefined}
              readonly={readonly}
              disabled
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="estate.externalCode"
          control={control}
          render={({ field }) => (
            <TextField {...field} label={t('estate_unit.field.external_estate_code')} readonly={readonly} disabled />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="estate.name"
          control={control}
          render={({ field }) => (
            <TextField {...field} label={t('estate_unit.field.estate_name')} readonly={readonly} disabled />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="estate.addresses"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              value={parseAddressToString(field.value[0], language)}
              label={t('estate_unit.field.address_toponymy')}
              readonly={readonly}
              disabled
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="estate.status"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('estate_unit.field.estate_status')}
              options={Object.values(EstateStatus)}
              getOptionLabel={(option) => t(`common.enum.estate_status.${option}`)}
              readonly={readonly}
              disabled
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="estate.type"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('estate_unit.field.estate_type')}
              options={Object.values(EstateType)}
              getOptionLabel={(option) => t(`common.enum.estate_type.${option}`)}
              readonly={readonly}
              disabled
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="estate.usageType.name"
          control={control}
          render={({ field }) => (
            <TextField {...field} label={t('component.estate_usage_type_field.label')} readonly={readonly} disabled />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="estate.ownership"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('estate_unit.field.estate_ownership')}
              options={Object.values(EstateOwnership)}
              getOptionLabel={(option) => t(`common.enum.estate_ownership.${option}`)}
              readonly={readonly}
              disabled
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="estate.managementSubject.name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('estate_unit.field.estate_management_subject')}
              readonly={readonly}
              disabled
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="estate.managementOrgUnit.name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('estate_unit.field.estate_management_org_unit')}
              readonly={readonly}
              disabled
            />
          )}
        />
      </Grid2>
      <Grid2 size={12}>
        <Controller
          name="estate.notes"
          control={control}
          render={({ field }) => (
            <TextField {...field} label={t('estate_unit.field.notes')} readonly={readonly} multiline disabled />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
