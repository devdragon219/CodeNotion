import { Grid2 } from '@mui/material';
import { SectionTitle, SelectField, TextField } from '@realgimm5/frontend-common/components';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Applicability } from '../../../../enums/Applicability';
import { AccountingItemField } from '../../../core/Fields/AccountingItem/AccountingItem';
import { BillItemTypeGeneralDataProps } from './GeneralData.types';

export const BillItemTypeGeneralData = ({ control, errors, readonly }: BillItemTypeGeneralDataProps) => {
  const { t } = useTranslation();

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <SectionTitle value="bill_item_type.section_title.general_data" />
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="internalCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('bill_item_type.field.internal_code')}
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
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('bill_item_type.field.description')}
              error={!!errors.description}
              helperText={errors.description?.message}
              required
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="isPositive"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('bill_item_type.field.sign')}
              options={[true, false]}
              getOptionLabel={(isPositive) => (isPositive ? '+' : '-')}
              error={!!errors.isPositive}
              helperText={errors.isPositive?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="applicability"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              multiple
              label={t('bill_item_type.field.applicability')}
              options={Object.values(Applicability)}
              selectAll="bill_item_type.action.select_all_applicabilities"
              getOptionLabel={(option) => t(`core.enum.applicability.${option}`)}
              error={!!errors.applicability}
              helperText={errors.applicability?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <SectionTitle value="bill_item_type.section_title.other_data" />
      <Grid2 size={12}>
        <Controller
          name="defaultAccountingItem"
          control={control}
          render={({ field }) => (
            <AccountingItemField
              {...field}
              label={t('bill_item_type.field.accounting_item')}
              error={!!errors.defaultAccountingItem}
              helperText={errors.defaultAccountingItem?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
