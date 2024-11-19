// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type CatalogueItemFieldFragment = {
  __typename?: 'CatalogueItemField';
  name: string;
  isMandatory: boolean;
  templateTypeId: string;
  type: Types.CustomFieldType;
  value?: string | null;
};

export const CatalogueItemFieldFragmentDoc = gql`
  fragment CatalogueItemFieldFragment on CatalogueItemField {
    name
    isMandatory
    templateTypeId
    type
    value
  }
`;
