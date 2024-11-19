import { Grid2 } from '@mui/material';
import { SectionTitle, TextField } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ServiceCategoryGeneralDataProps } from './GeneralData.types';

export const ServiceCategoryGeneralData = ({ control, errors, mode, readonly }: ServiceCategoryGeneralDataProps) => {
  const { t } = useTranslation();

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {mode === FormMode.Create && <SectionTitle value="service_category.tab.general_data" />}
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="internalCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('service_category.field.service_category_code')}
              error={!!errors.internalCode}
              helperText={errors.internalCode?.message}
              required
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
              label={t('service_category.field.name')}
              error={!!errors.name}
              helperText={errors.name?.message}
              required
              readonly={readonly}
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
