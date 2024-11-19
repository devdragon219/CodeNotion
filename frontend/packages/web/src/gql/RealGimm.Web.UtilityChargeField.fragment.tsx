// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type UtilityChargeFieldFragment = {
  __typename?: 'UtilityChargeField';
  name: string;
  isMandatory: boolean;
  id: string;
  type: Types.CustomFieldType;
  validValues?: Array<string> | null;
};

export const UtilityChargeFieldFragmentDoc = gql`
  fragment UtilityChargeFieldFragment on UtilityChargeField {
    name
    isMandatory
    id
    type
    validValues
  }
`;
