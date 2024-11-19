// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type CostChargeFieldFragment = {
  __typename?: 'CostChargeField';
  name: string;
  isMandatory: boolean;
  templateTypeId: string;
  type: Types.CustomFieldType;
  value?: string | null;
};

export const CostChargeFieldFragmentDoc = gql`
  fragment CostChargeFieldFragment on CostChargeField {
    name
    isMandatory
    templateTypeId
    type
    value
  }
`;
