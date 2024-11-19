import { Grid2 } from '@mui/material';
import { CurrencyField, TextField } from '@realgimm5/frontend-common/components';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { PriceListMeasurementUnitField } from '../../../../../core/Fields/PriceListMeasurementUnit/PriceListMeasurementUnit';
import { ArticleFieldProps } from './Field.types';

export const ArticleField = ({ control, errors, index }: ArticleFieldProps) => {
  const { t } = useTranslation();

  return (
    <Grid2 container spacing={{ xs: 2, sm: 3 }}>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name={`articles.${index}.internalCode`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('ticket.field.quote_article_code')}
              error={!!errors.articles?.[index]?.internalCode}
              helperText={errors.articles?.[index]?.internalCode?.message}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name={`articles.${index}.name`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t('ticket.field.quote_article_name')}
              error={!!errors.articles?.[index]?.name}
              helperText={errors.articles?.[index]?.name?.message}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name={`articles.${index}.unitPrice`}
          control={control}
          render={({ field }) => (
            <CurrencyField
              {...field}
              label={t('ticket.field.quote_article_price')}
              error={!!errors.articles?.[index]?.unitPrice}
              helperText={errors.articles?.[index]?.unitPrice?.message}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name={`articles.${index}.quantity`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label={t('ticket.field.quote_article_quantity')}
              error={!!errors.articles?.[index]?.quantity}
              helperText={errors.articles?.[index]?.quantity?.message}
              required
            />
          )}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <Controller
          name={`articles.${index}.measurementUnit`}
          control={control}
          render={({ field }) => (
            <PriceListMeasurementUnitField
              {...field}
              label={t('ticket.field.quote_article_unit')}
              error={!!errors.articles?.[index]?.measurementUnit}
              helperText={errors.articles?.[index]?.measurementUnit?.message}
              required
            />
          )}
        />
      </Grid2>
    </Grid2>
  );
};
