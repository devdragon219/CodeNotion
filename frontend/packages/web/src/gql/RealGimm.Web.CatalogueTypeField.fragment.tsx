// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type CatalogueTypeFieldFragment = {
  __typename?: 'CatalogueTypeField';
  name: string;
  isMandatory: boolean;
  type: Types.CustomFieldType;
  validValues?: Array<string> | null;
  id: string;
};

export const CatalogueTypeFieldFragmentDoc = gql`
  fragment CatalogueTypeFieldFragment on CatalogueTypeField {
    name
    isMandatory
    type
    validValues
    id
  }
`;
