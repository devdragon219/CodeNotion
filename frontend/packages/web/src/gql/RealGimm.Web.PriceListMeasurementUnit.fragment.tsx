// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type PriceListMeasurementUnitFragment = {
  __typename?: 'PriceListMeasurementUnit';
  internalCode: string;
  name: string;
  ordering: number;
  id: number;
};

export const PriceListMeasurementUnitFragmentDoc = gql`
  fragment PriceListMeasurementUnitFragment on PriceListMeasurementUnit {
    internalCode
    name
    ordering
    id
  }
`;
