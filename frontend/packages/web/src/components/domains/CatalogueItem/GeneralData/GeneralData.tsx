import { Divider, Grid2 } from '@mui/material';
import { DateField, FormViewer, SelectField, TextField } from '@realgimm5/frontend-common/components';
import { EstateStatus } from '@realgimm5/frontend-common/gql/types';
import { useEffect } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CatalogueItemGeneralDataProps } from './GeneralData.types';

export const CatalogueItemGeneralData = ({ control, errors, readonly, setValue }: CatalogueItemGeneralDataProps) => {
  const { t } = useTranslation();
  const status = useWatch({ control, name: 'status' });

  useEffect(() => {
    if (status !== EstateStatus.Decommissioned) {
      setValue('decommissioningDate', null);
    }
    // eslint-disable-next-line
  }, [status]);

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="catalogueType.category.name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('catalogue_item.field.catalogue_category')}
              error={!!errors.catalogueType?.category?.name}
              helperText={errors.catalogueType?.category?.name?.message}
              readonly={readonly}
              disabled
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="catalogueType.subCategory.name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('catalogue_item.field.catalogue_subcategory')}
              error={!!errors.catalogueType?.subCategory?.name}
              helperText={errors.catalogueType?.subCategory?.name?.message}
              readonly={readonly}
              disabled
            />
          )}
        />
      </Grid2>
      <Grid2 size={12}>
        <Controller
          name="catalogueType.name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('catalogue_item.field.catalogue_type')}
              error={!!errors.catalogueType?.name}
              helperText={errors.catalogueType?.name?.message}
              readonly={readonly}
              disabled
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={12}>
        <Divider />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="internalCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('catalogue_item.field.catalogue_item_code')}
              error={!!errors.internalCode}
              helperText={errors.internalCode?.message}
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
              label={t('catalogue_item.field.catalogue_item_status')}
              options={Object.values(EstateStatus)}
              getOptionLabel={(option) => t(`common.enum.estate_status.${option}`)}
              error={!!errors.status}
              helperText={errors.status?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="activationDate"
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('catalogue_item.field.catalogue_item_activation_date')}
              error={!!errors.activationDate}
              helperText={errors.activationDate?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="decommissioningDate"
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('catalogue_item.field.catalogue_item_decommissioning_date')}
              error={!!errors.decommissioningDate}
              helperText={errors.decommissioningDate?.message}
              readonly={readonly}
              required={status === EstateStatus.Decommissioned}
              disabled={status !== EstateStatus.Decommissioned}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="lastMaintenanceDate"
          control={control}
          render={({ field }) => (
            <DateField
              {...field}
              label={t('catalogue_item.field.catalogue_item_last_maintenance_date')}
              error={!!errors.lastMaintenanceDate}
              helperText={errors.lastMaintenanceDate?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={12}>
        <Divider />
      </Grid2>
      <Grid2 size={12}>
        <Controller
          name="fields"
          control={control}
          render={({ field }) => <FormViewer {...field} errors={errors} readonly={readonly} />}
        />
      </Grid2>
    </Grid2>
  );
};
