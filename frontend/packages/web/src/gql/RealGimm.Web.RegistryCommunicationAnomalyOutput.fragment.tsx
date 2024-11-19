// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type RegistryCommunicationGroupAnomalyFragment = {
  __typename?: 'RegistryCommunicationAnomalyOutput';
  contractInternalCode?: string | null;
  description: string;
  guid: string;
};

export const RegistryCommunicationGroupAnomalyFragmentDoc = gql`
  fragment RegistryCommunicationGroupAnomalyFragment on RegistryCommunicationAnomalyOutput {
    contractInternalCode
    description
    guid
  }
`;
