import { Grid2 } from '@mui/material';
import { SelectField, TextField } from '@realgimm5/frontend-common/components';
import { EstateMarketValueType } from '@realgimm5/frontend-common/gql/types';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { MarketValueFieldProps } from './Field.types';

export const MarketValueField = ({ control, errors, index }: MarketValueFieldProps) => {
  const { t } = useTranslation();

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name={`marketValues.${index}.marketValueType`}
          control={control}
          render={({ field }) => (
            <SelectField
              {...field}
              options={Object.values(EstateMarketValueType)}
              getOptionLabel={(type) => t(`common.enum.estate_market_value_type.${type}`)}
              label={t('estate.field.market_value_type')}
              error={!!errors.marketValues?.[index]?.marketValueType}
              helperText={errors.marketValues?.[index]?.marketValueType?.message}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name={`marketValues.${index}.value`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label={t('estate.field.market_value_value')}
              error={!!errors.marketValues?.[index]?.value}
              helperText={errors.marketValues?.[index]?.value?.message}
              required
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
