import { SecondaryTable, TextField } from '@realgimm5/frontend-common/components';
import { parseNumberToCurrency } from '@realgimm5/frontend-common/utils';
import { Controller, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ArticlesTableProps } from './Field.types';

export const ArticlesTable = ({ control, errors }: ArticlesTableProps) => {
  const {
    i18n: { language },
    t,
  } = useTranslation();
  const articles = useWatch({ control, name: 'articles' });

  return (
    <SecondaryTable
      columns={[
        'ticket.field.quote_article_code',
        'ticket.field.quote_article_name',
        'ticket.field.quote_article_unit',
        'ticket.field.quote_article_price',
        'ticket.field.quote_article_quantity',
        'ticket.field.quote_article_total_amount',
        'ticket.field.quote_article_price_list',
      ]}
      rows={articles.map((entry, index) => [
        entry.internalCode,
        entry.name,
        entry.measurementUnit?.name,
        entry.unitPrice,
        <Controller
          key={`articles.${index}.quantity`}
          name={`articles.${index}.quantity`}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              sx={{ minWidth: '200px' }}
              placeholder={t('contract.field.counterpart_since')}
              error={!!errors.articles?.[index]?.quantity}
              helperText={errors.articles?.[index]?.quantity?.message}
              required
            />
          )}
        />,
        parseNumberToCurrency((entry.unitPrice ?? 0) * (entry.quantity ?? 0), language),
        entry.sourceArticle?.priceList.name,
      ])}
    />
  );
};
