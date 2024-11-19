import { Grid2 } from '@mui/material';
import { CheckboxField, SectionTitle, TextField } from '@realgimm5/frontend-common/components';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { PriceListGeneralDataProps } from './GeneralData.types';

export const PriceListGeneralData = ({ control, errors, readonly }: PriceListGeneralDataProps) => {
  const { t } = useTranslation();

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <SectionTitle value="price_list.section_title.general_data" />
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="ordering"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label={t('price_list.field.ordering')}
              error={!!errors.ordering}
              helperText={errors.ordering?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="internalCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('price_list.field.internal_code')}
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
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('price_list.field.name')}
              error={!!errors.name}
              helperText={errors.name?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="isDefault"
          control={control}
          render={({ field }) => (
            <CheckboxField
              {...field}
              label={t('price_list.field.default')}
              error={!!errors.isDefault}
              helperText={errors.isDefault?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
