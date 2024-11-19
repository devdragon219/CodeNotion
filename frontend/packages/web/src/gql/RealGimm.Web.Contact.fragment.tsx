// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type ContactFragment = {
  __typename?: 'Contact';
  id: number;
  contactInfo?: string | null;
  contactInfoType: Types.ContactInfoType;
  contactType: Types.ContactType;
};

export const ContactFragmentDoc = gql`
  fragment ContactFragment on Contact {
    id
    contactInfo
    contactInfoType
    contactType
  }
`;
