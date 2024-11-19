// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type SubjectCategoryFragment = {
  __typename?: 'SubjectCategory';
  name: string;
  id: number;
  function: { __typename?: 'CategoryFunctionFlags'; isCompanyGroup: boolean };
};

export const SubjectCategoryFragmentDoc = gql`
  fragment SubjectCategoryFragment on SubjectCategory {
    name
    function {
      isCompanyGroup
    }
    id
  }
`;
