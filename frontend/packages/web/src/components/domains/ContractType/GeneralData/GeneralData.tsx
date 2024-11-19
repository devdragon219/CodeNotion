import { Grid2 } from '@mui/material';
import { CheckboxField, SectionTitle, SelectField, TextField } from '@realgimm5/frontend-common/components';
import { FormMode } from '@realgimm5/frontend-common/enums';
import { AssetNature } from '@realgimm5/frontend-common/gql/types';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { UsageTypeField } from '../../../core/Fields/UsageType/UsageType';
import { ContractTypeGeneralDataProps } from './GeneralData.types';

export const ContractTypeGeneralData = ({ control, errors, mode, readonly }: ContractTypeGeneralDataProps) => {
  const { t } = useTranslation();

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      {mode === FormMode.Create && <SectionTitle value="contract_type.section_title.general_data" />}
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="internalCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('contract_type.field.internal_code')}
              error={!!errors.internalCode}
              helperText={errors.internalCode?.message}
              required
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('contract_type.field.description')}
              error={!!errors.description}
              helperText={errors.description?.message}
              required
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="isActive"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('contract_type.field.typology')}
              options={[true, false]}
              getOptionLabel={(isActive) => t(`contract_type.contract_typology.${isActive ? 'active' : 'passive'}`)}
              error={!!errors.isActive}
              helperText={errors.isActive?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="isRentChargeApplicable"
          control={control}
          render={({ field }) => (
            <CheckboxField
              {...field}
              label={t('contract_type.field.fee')}
              error={!!errors.isRentChargeApplicable}
              helperText={errors.isRentChargeApplicable?.message}
              readonly={readonly}
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="nature"
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              label={t('contract_type.field.nature_type')}
              options={Object.values(AssetNature)}
              getOptionLabel={(option) => t(`common.enum.asset_nature.${option}`)}
              error={!!errors.nature}
              helperText={errors.nature?.message}
              readonly={readonly}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name="usageType"
          control={control}
          render={({ field }) => (
            <UsageTypeField
              {...field}
              label={t('contract_type.field.usage_type')}
              error={!!errors.usageType}
              helperText={errors.usageType?.message}
              readonly={readonly}
              required
              isFor="contracts"
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
