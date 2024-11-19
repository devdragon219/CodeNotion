// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { PriceListDetailFragmentDoc, PriceListFragmentDoc } from './RealGimm.Web.PriceList.fragment';

export type PriceListArticleFragment = {
  __typename?: 'PriceListArticle';
  internalCode: string;
  name: string;
  actualPrice?: number | null;
  actualPriceSince?: string | null;
  actualPriceUntil?: string | null;
  id: number;
  priceList: { __typename?: 'PriceList'; internalCode: string; name: string; ordering: number; id: number };
  measurementUnit: { __typename?: 'PriceListMeasurementUnit'; id: number; name: string };
  catalogueTypes: Array<{
    __typename?: 'CatalogueType';
    id: number;
    name: string;
    category: { __typename?: 'CatalogueCategory'; id: number; name: string };
    subCategory?: { __typename?: 'CatalogueSubCategory'; id: number; name: string } | null;
  }>;
};

export type PriceListArticleDetailFragment = {
  __typename?: 'PriceListArticle';
  internalCode: string;
  name: string;
  actualPrice?: number | null;
  actualPriceSince?: string | null;
  actualPriceUntil?: string | null;
  id: number;
  pricePeriods: Array<{
    __typename?: 'ArticlePricePeriod';
    id: number;
    since: string;
    until?: string | null;
    price: number;
  }>;
  priceList: { __typename?: 'PriceList'; internalCode: string; name: string; ordering: number; id: number };
  measurementUnit: { __typename?: 'PriceListMeasurementUnit'; id: number; name: string };
  catalogueTypes: Array<{
    __typename?: 'CatalogueType';
    id: number;
    name: string;
    category: { __typename?: 'CatalogueCategory'; id: number; name: string };
    subCategory?: { __typename?: 'CatalogueSubCategory'; id: number; name: string } | null;
  }>;
};

export type TicketPriceListArticleFragment = {
  __typename?: 'PriceListArticle';
  id: number;
  internalCode: string;
  name: string;
  actualPrice?: number | null;
  priceList: { __typename?: 'PriceList'; internalCode: string; name: string; ordering: number; id: number };
  measurementUnit: { __typename?: 'PriceListMeasurementUnit'; id: number; name: string };
};

export const PriceListArticleFragmentDoc = gql`
  fragment PriceListArticleFragment on PriceListArticle {
    internalCode
    name
    priceList {
      ...PriceListFragment
    }
    actualPrice
    actualPriceSince
    actualPriceUntil
    measurementUnit {
      id
      name
    }
    catalogueTypes {
      id
      name
      category {
        id
        name
      }
      subCategory {
        id
        name
      }
    }
    id
  }
`;
export const PriceListArticleDetailFragmentDoc = gql`
  fragment PriceListArticleDetailFragment on PriceListArticle {
    ...PriceListArticleFragment
    pricePeriods {
      id
      since
      until
      price
    }
  }
`;
export const TicketPriceListArticleFragmentDoc = gql`
  fragment TicketPriceListArticleFragment on PriceListArticle {
    id
    internalCode
    name
    priceList {
      ...PriceListFragment
    }
    actualPrice
    measurementUnit {
      id
      name
    }
  }
`;
