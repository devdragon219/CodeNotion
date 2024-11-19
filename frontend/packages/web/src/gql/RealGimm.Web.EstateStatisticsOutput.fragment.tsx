// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type EstateStatisticsOutputFragment = {
  __typename?: 'EstateStatisticsOutput';
  estatesCount: number;
  estateUnitsCount: number;
  occupiedEstatesCount: number;
  vacantEstatesCount: number;
};

export const EstateStatisticsOutputFragmentDoc = gql`
  fragment EstateStatisticsOutputFragment on EstateStatisticsOutput {
    estatesCount
    estateUnitsCount
    occupiedEstatesCount
    vacantEstatesCount
  }
`;
