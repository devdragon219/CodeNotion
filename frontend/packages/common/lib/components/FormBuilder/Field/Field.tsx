import { Paper, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { FormBuilderFieldIcon } from '../FieldIcon/FieldIcon';
import { FormBuilderFieldProps } from './Field.types';

export const FormBuilderField = ({ disabled, overlay, type }: FormBuilderFieldProps) => {
  const { t } = useTranslation();

  return (
    <Paper
      square
      variant="elevation"
      sx={{
        cursor: disabled ? 'default' : 'pointer',
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
        height: '48px',
        px: 2,
        ...(overlay
          ? {
              maxWidth: '250px',
            }
          : {}),
      }}
    >
      <FormBuilderFieldIcon type={type} />
      <Typography variant="bodyMd" sx={(theme) => ({ color: theme.palette.grey[700] })}>
        {t(`common.enum.custom_field_type.${type}`)}
      </Typography>
    </Paper>
  );
};
