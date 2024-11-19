import { Loader, TransferList } from '@realgimm5/frontend-common/components';
import { useCallback, useMemo } from 'react';
import { useWatch } from 'react-hook-form';

import { TicketPriceListArticleFragment } from '../../../../../gql/RealGimm.Web.PriceListArticle.fragment';
import { useGetAllPriceListArticlesQuery } from '../../../../../gql/RealGimm.Web.PriceListArticle.operation';
import { TicketQuoteArticleFormInput } from '../../../../../interfaces/FormInputs/Ticket';
import { getEmptyTicketQuoteArticleFormInput } from '../../../../../utils/ticket/initialValues';
import { ArticlesTransferListProps } from './Field.types';

export const ArticlesTransferList = ({ control, priceList, setValue }: ArticlesTransferListProps) => {
  const [queryState] = useGetAllPriceListArticlesQuery({
    variables: {
      where: {
        priceList: {
          id: {
            eq: priceList.id,
          },
        },
      },
    },
  });
  const priceListArticles = useMemo(
    () => queryState.data?.priceListArticle.listPriceListArticlesFull ?? [],
    [queryState.data],
  );
  const articles = useWatch({ control, name: 'articles' });
  const value = useMemo(() => articles.map(({ sourceArticle }) => sourceArticle!), [articles]);

  const handleChange = useCallback(
    (value: TicketPriceListArticleFragment[]) => {
      setValue(
        'articles',
        value.map<TicketQuoteArticleFormInput>((sourceArticle) => getEmptyTicketQuoteArticleFormInput(sourceArticle)),
      );
    },
    [setValue],
  );

  return (
    <>
      {queryState.fetching && <Loader />}
      <TransferList
        columns={[
          {
            id: 'internalCode',
            label: 'ticket.field.quote_article_code',
            enableColumnFilter: true,
            enableGlobalFilter: true,
            enableSorting: true,
          },
          {
            id: 'name',
            label: 'ticket.field.quote_article_name',
            enableColumnFilter: true,
            enableGlobalFilter: true,
            enableSorting: true,
          },
          {
            id: 'priceUnit',
            label: 'ticket.field.quote_article_price',
            type: 'currency',
            enableColumnFilter: true,
            enableGlobalFilter: true,
            enableSorting: true,
          },
        ]}
        empty="ticket.text.no_articles"
        rows={priceListArticles}
        titles={{
          left: 'ticket.section_title.select_quote_articles',
          right: 'ticket.section_title.selected_quote_articles',
        }}
        value={value}
        getRowId={({ id }) => String(id)}
        onChange={handleChange}
      />
    </>
  );
};
