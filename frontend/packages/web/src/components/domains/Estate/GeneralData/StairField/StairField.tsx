import { TextField } from '@realgimm5/frontend-common/components';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { StairFieldProps } from './StairField.types';

export const StairField = ({ control, errors, index, readonly }: StairFieldProps) => {
  const { t } = useTranslation();

  return (
    <Controller
      name={`stairs.${index}.description`}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          label={t('estate.field.stair')}
          error={!!errors.stairs?.[index]?.description}
          helperText={errors.stairs?.[index]?.description?.message}
          readonly={readonly}
        />
      )}
    />
  );
};
