// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { TicketUserFragmentDoc } from './RealGimm.Web.User.fragment';

export type QuoteHistoryEntryFragment_AmountUpdatedQuoteHistoryEntry = {
  __typename: 'AmountUpdatedQuoteHistoryEntry';
  oldAmount?: number | null;
  newAmount?: number | null;
  id: number;
  timestamp: string;
  userId: number;
  user?: {
    __typename?: 'User';
    id: number;
    firstName?: string | null;
    lastName?: string | null;
    userName: string;
  } | null;
};

export type QuoteHistoryEntryFragment_ApprovedAmountUpdatedQuoteHistoryEntry = {
  __typename: 'ApprovedAmountUpdatedQuoteHistoryEntry';
  oldApprovedAmount?: number | null;
  newApprovedAmount?: number | null;
  id: number;
  timestamp: string;
  userId: number;
  user?: {
    __typename?: 'User';
    id: number;
    firstName?: string | null;
    lastName?: string | null;
    userName: string;
  } | null;
};

export type QuoteHistoryEntryFragment_MasterStatusUpdatedQuoteHistoryEntry = {
  __typename: 'MasterStatusUpdatedQuoteHistoryEntry';
  oldMasterStatus?: Types.QuoteMasterStatus | null;
  newMasterStatus: Types.QuoteMasterStatus;
  id: number;
  timestamp: string;
  userId: number;
  user?: {
    __typename?: 'User';
    id: number;
    firstName?: string | null;
    lastName?: string | null;
    userName: string;
  } | null;
};

export type QuoteHistoryEntryFragment =
  | QuoteHistoryEntryFragment_AmountUpdatedQuoteHistoryEntry
  | QuoteHistoryEntryFragment_ApprovedAmountUpdatedQuoteHistoryEntry
  | QuoteHistoryEntryFragment_MasterStatusUpdatedQuoteHistoryEntry;

export const QuoteHistoryEntryFragmentDoc = gql`
  fragment QuoteHistoryEntryFragment on QuoteHistoryEntry {
    __typename
    id
    timestamp
    userId
    ... on AmountUpdatedQuoteHistoryEntry {
      oldAmount
      newAmount
      user {
        ...TicketUserFragment
      }
    }
    ... on ApprovedAmountUpdatedQuoteHistoryEntry {
      oldApprovedAmount
      newApprovedAmount
      user {
        ...TicketUserFragment
      }
    }
    ... on MasterStatusUpdatedQuoteHistoryEntry {
      oldMasterStatus
      newMasterStatus
      user {
        ...TicketUserFragment
      }
    }
  }
`;
