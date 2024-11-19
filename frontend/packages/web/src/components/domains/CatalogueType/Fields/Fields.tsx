import { Box, Grid2 } from '@mui/material';
import { Alert, EmptyText, FormBuilder, SectionTitle, TextField } from '@realgimm5/frontend-common/components';
import { DEFAULT_BORDER_RADIUS } from '@realgimm5/frontend-common/configs';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CatalogueTypeFieldsProps } from './Fields.types';

export const CatalogueTypeFields = ({ control, errors, mode, readonly }: CatalogueTypeFieldsProps) => {
  const { t } = useTranslation();
  const fields = useWatch({ control, name: 'fields' });

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {mode === FormMode.Edit && errors.fields?.message && (
        <Grid2 size={12}>
          <Alert severity="error" message={errors.fields.message} />
        </Grid2>
      )}
      <SectionTitle value="catalogue_type.section_title.default_fields" />
      <Grid2 size={12}>
        <Box
          sx={(theme) => ({
            borderRadius: `${DEFAULT_BORDER_RADIUS}px`,
            backgroundColor: theme.palette.grey[200],
            p: 3,
          })}
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }}>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <TextField label={t('catalogue_type.field.catalogue_item_code')} disabled required />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <TextField label={t('catalogue_type.field.catalogue_item_status')} disabled required />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <TextField label={t('catalogue_type.field.catalogue_item_activation_date')} disabled required />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <TextField label={t('catalogue_type.field.catalogue_item_decommissioning_date')} disabled />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <TextField label={t('catalogue_type.field.catalogue_item_last_maintenance_date')} disabled required />
            </Grid2>
          </Grid2>
        </Box>
      </Grid2>
      <SectionTitle value="catalogue_type.section_title.additional_fields" />
      {mode === FormMode.Edit && (fields.length === 0 || fields[0].fields.length === 0) && readonly ? (
        <EmptyText value="catalogue_type.text.no_fields" />
      ) : (
        <Grid2 size={12}>
          <Controller
            name="fields"
            control={control}
            render={({ field }) => <FormBuilder {...field} readonly={readonly} />}
          />
        </Grid2>
      )}
    </Grid2>
  );
};
