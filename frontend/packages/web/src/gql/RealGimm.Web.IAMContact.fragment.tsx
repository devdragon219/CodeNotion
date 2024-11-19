// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type UserContactFragment = {
  __typename?: 'IAMContact';
  id: number;
  contactInfoType: Types.ContactInfoType;
  contactInfo?: string | null;
  contactType: Types.ContactType;
};

export const UserContactFragmentDoc = gql`
  fragment UserContactFragment on IAMContact {
    id
    contactInfoType
    contactInfo
    contactType
  }
`;
