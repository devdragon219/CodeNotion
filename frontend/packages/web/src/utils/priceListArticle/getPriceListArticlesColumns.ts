import { TableColumn } from '@realgimm5/frontend-common/interfaces';
import { ReactElement } from 'react';

import { PriceListArticleFragment } from '../../gql/RealGimm.Web.PriceListArticle.fragment';

export const getPriceListArticlesColumns = (
  showAll: (row: PriceListArticleFragment) => ReactElement,
  options?: {
    usePriceList?: boolean;
    useUntil?: boolean;
  },
): TableColumn<PriceListArticleFragment>[] => [
  {
    id: 'internalCode',
    label: 'price_list_article.field.internal_code',
    enableColumnFilter: true,
    enableSorting: true,
    enableGlobalFilter: true,
  },
  {
    id: 'name',
    label: 'price_list_article.field.name',
    enableColumnFilter: true,
    enableSorting: true,
    enableGlobalFilter: true,
  },
  {
    id: 'catalogueTypes',
    label: 'price_list_article.field.catalogue_types',
    getRowValue: (row) => {
      if (row.catalogueTypes.length === 0) {
        return '-';
      }
      return showAll(row);
    },
  },
  ...((options?.usePriceList
    ? [
        {
          id: 'priceList.name',
          label: 'price_list_article.field.price_list',
          enableColumnFilter: true,
          enableSorting: true,
          enableGlobalFilter: true,
        },
      ]
    : []) as TableColumn<PriceListArticleFragment>[]),
  {
    id: 'actualPriceSince',
    label: 'price_list_article.field.date_since',
    type: 'date',
    enableColumnFilter: true,
    enableSorting: true,
  },
  ...((options?.useUntil
    ? [
        {
          id: 'actualPriceUntil',
          label: 'price_list_article.field.date_until',
          type: 'date',
          enableColumnFilter: true,
          enableSorting: true,
        },
      ]
    : []) as TableColumn<PriceListArticleFragment>[]),
  {
    id: 'measurementUnit.name',
    label: 'price_list_article.field.measurement_unit',
    enableColumnFilter: true,
    enableSorting: true,
    enableGlobalFilter: true,
  },
  {
    id: 'actualPrice',
    label: 'price_list_article.field.price',
    type: 'currency',
    enableColumnFilter: true,
    enableSorting: true,
  },
];
