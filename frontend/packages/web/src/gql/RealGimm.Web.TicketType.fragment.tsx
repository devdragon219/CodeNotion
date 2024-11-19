// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type TicketTypeFragment = {
  __typename?: 'TicketType';
  internalCode: string;
  description: string;
  ordering: number;
  id: number;
};

export const TicketTypeFragmentDoc = gql`
  fragment TicketTypeFragment on TicketType {
    internalCode
    description
    ordering
    id
  }
`;
