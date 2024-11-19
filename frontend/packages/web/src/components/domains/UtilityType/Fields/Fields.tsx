import { Box, Grid2 } from '@mui/material';
import {
  Alert,
  CurrencyField,
  EmptyText,
  FormBuilder,
  SectionTitle,
  TextField,
} from '@realgimm5/frontend-common/components';
import { DEFAULT_BORDER_RADIUS } from '@realgimm5/frontend-common/configs';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { t } from 'i18next';
import { Controller, useWatch } from 'react-hook-form';

import { UtilityTypeFieldsProps } from './Fields.types';

export const UtilityTypeFields = ({ control, errors, mode, readonly }: UtilityTypeFieldsProps) => {
  const fields = useWatch({ control, name: 'fields' });

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {mode === FormMode.Edit && errors.fields?.message && (
        <Grid2 size={12}>
          <Alert severity="error" message={errors.fields.message} />
        </Grid2>
      )}
      <SectionTitle value="utility_type.section_title.default_fields" />
      <Grid2 size={12}>
        <Box
          sx={(theme) => ({
            borderRadius: `${DEFAULT_BORDER_RADIUS}px`,
            backgroundColor: theme.palette.grey[200],
            p: 3,
          })}
        >
          <Grid2 container spacing={{ xs: 2, sm: 3 }}>
            <Grid2 size={{ xs: 12, sm: 3 }}>
              <CurrencyField label={t('utility_type.field.expense_amount')} required disabled />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 3 }}>
              <TextField label={t('utility_type.field.expense_period')} required disabled />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 3 }}>
              <TextField label={t('utility_type.field.expense_since')} required disabled />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 3 }}>
              <TextField label={t('utility_type.field.expense_until')} required disabled />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <TextField label={t('utility_type.field.expense_number')} required disabled />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <CurrencyField label={t('utility_type.field.expense_vat')} disabled />
            </Grid2>
          </Grid2>
        </Box>
      </Grid2>
      <SectionTitle value="utility_type.section_title.additional_fields" />
      {mode === FormMode.Edit && (fields.length === 0 || fields[0].fields.length === 0) && readonly ? (
        <EmptyText value="utility_type.text.no_additional_fields" />
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
