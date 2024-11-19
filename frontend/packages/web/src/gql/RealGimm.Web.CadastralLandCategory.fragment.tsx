// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type CadastralLandCategoryFragment = {
  __typename?: 'CadastralLandCategory';
  id: number;
  description: string;
  internalCode: string;
  countryISO: string;
  ordering: number;
};

export const CadastralLandCategoryFragmentDoc = gql`
  fragment CadastralLandCategoryFragment on CadastralLandCategory {
    id
    description
    internalCode
    countryISO
    ordering
  }
`;
