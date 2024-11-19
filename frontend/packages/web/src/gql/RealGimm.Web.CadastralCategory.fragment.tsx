// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type CadastralCategoryFragment = {
  __typename?: 'CadastralCategory';
  id: number;
  description: string;
  externalCode?: string | null;
};

export const CadastralCategoryFragmentDoc = gql`
  fragment CadastralCategoryFragment on CadastralCategory {
    id
    description
    externalCode
  }
`;
