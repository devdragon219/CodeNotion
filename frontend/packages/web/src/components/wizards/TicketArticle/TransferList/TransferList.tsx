import { yupResolver } from '@hookform/resolvers/yup';
import { Grid2 } from '@mui/material';
import { SelectField, StepForm } from '@realgimm5/frontend-common/components';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { PriceListDetailFragment } from '../../../../gql/RealGimm.Web.PriceList.fragment';
import { TicketQuoteArticleFormInput, TicketQuoteFormInput } from '../../../../interfaces/FormInputs/Ticket';
import { getTicketArticlesSchema } from '../../../../utils/ticket/schemas/quote';
import { ArticlesTransferList } from './Field/Field';
import { TicketArticlesTransferListStepProps } from './TransferList.types';

export const TicketArticlesTransferListStep = ({
  articles,
  priceLists,
  onChange,
  onError,
  onNext,
}: TicketArticlesTransferListStepProps) => {
  const { t } = useTranslation();
  const [priceList, setPriceList] = useState<PriceListDetailFragment | null>(null);
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<TicketQuoteFormInput>({
    defaultValues: {
      articles,
    },
    resolver: yupResolver(getTicketArticlesSchema(t, false)),
  });

  useEffect(() => {
    const { unsubscribe } = watch(({ articles }) => {
      onChange(articles as TicketQuoteArticleFormInput[]);
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (errors.articles) {
      onError(errors.articles.message);
    }
    // eslint-disable-next-line
  }, [errors.articles]);

  const handlePriceListChange = useCallback(
    (priceList: PriceListDetailFragment | null) => {
      setPriceList(priceList);
      setValue('articles', []);
    },
    [setValue],
  );

  return (
    <StepForm sx={{ height: 'calc(100% - 92px)' }} onNext={onError} onSubmit={handleSubmit(onNext)}>
      <Grid2 container spacing={{ xs: 2, sm: 3 }}>
        <Grid2 size={12}>
          <SelectField
            label={t('ticket.field.quote_article_price_list')}
            options={priceLists}
            getOptionKey={(option) => String(option.id)}
            getOptionLabel={(option) => option.name}
            value={priceList}
            onChange={handlePriceListChange}
          />
        </Grid2>
        {priceList && (
          <Grid2 size={12}>
            <ArticlesTransferList control={control} priceList={priceList} setValue={setValue} />
          </Grid2>
        )}
      </Grid2>
    </StepForm>
  );
};
