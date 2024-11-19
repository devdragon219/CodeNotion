// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type RevaluationDataFragment = {
  __typename?: 'RevaluationData';
  id: number;
  year: number;
  month: number;
  baseYear: number;
  revaluationIndex: number;
};

export const RevaluationDataFragmentDoc = gql`
  fragment RevaluationDataFragment on RevaluationData {
    id
    year
    month
    baseYear
    revaluationIndex
  }
`;
