// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { TicketUserFragmentDoc } from './RealGimm.Web.User.fragment';

export type TicketHistoryEntryFragment_ConvertedToExcludedFromMaintenanceContractTicketHistoryEntry = {
  __typename: 'ConvertedToExcludedFromMaintenanceContractTicketHistoryEntry';
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

export type TicketHistoryEntryFragment_MasterStatusUpdatedTicketHistoryEntry = {
  __typename: 'MasterStatusUpdatedTicketHistoryEntry';
  oldMasterStatus?: Types.TicketMasterStatus | null;
  newMasterStatus: Types.TicketMasterStatus;
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

export type TicketHistoryEntryFragment_NewReminderTicketHistoryEntry = {
  __typename: 'NewReminderTicketHistoryEntry';
  reminderDate: string;
  reminderSummary: string;
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

export type TicketHistoryEntryFragment_NewReplyTicketHistoryEntry = {
  __typename: 'NewReplyTicketHistoryEntry';
  id: number;
  timestamp: string;
  userId: number;
  reply: {
    __typename?: 'Reply';
    id: number;
    user?: {
      __typename?: 'User';
      id: number;
      firstName?: string | null;
      lastName?: string | null;
      userName: string;
    } | null;
  };
  user?: {
    __typename?: 'User';
    id: number;
    firstName?: string | null;
    lastName?: string | null;
    userName: string;
  } | null;
};

export type TicketHistoryEntryFragment_ReminderDeletedTicketHistoryEntry = {
  __typename: 'ReminderDeletedTicketHistoryEntry';
  reminderDate: string;
  reminderSummary: string;
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

export type TicketHistoryEntryFragment_ReminderUpdatedTicketHistoryEntry = {
  __typename: 'ReminderUpdatedTicketHistoryEntry';
  oldReminderDate: string;
  oldReminderSummary: string;
  newReminderDate: string;
  newReminderSummary: string;
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

export type TicketHistoryEntryFragment =
  | TicketHistoryEntryFragment_ConvertedToExcludedFromMaintenanceContractTicketHistoryEntry
  | TicketHistoryEntryFragment_MasterStatusUpdatedTicketHistoryEntry
  | TicketHistoryEntryFragment_NewReminderTicketHistoryEntry
  | TicketHistoryEntryFragment_NewReplyTicketHistoryEntry
  | TicketHistoryEntryFragment_ReminderDeletedTicketHistoryEntry
  | TicketHistoryEntryFragment_ReminderUpdatedTicketHistoryEntry;

export const TicketHistoryEntryFragmentDoc = gql`
  fragment TicketHistoryEntryFragment on TicketHistoryEntry {
    __typename
    id
    timestamp
    userId
    ... on ConvertedToExcludedFromMaintenanceContractTicketHistoryEntry {
      user {
        ...TicketUserFragment
      }
    }
    ... on MasterStatusUpdatedTicketHistoryEntry {
      oldMasterStatus
      newMasterStatus
      user {
        ...TicketUserFragment
      }
    }
    ... on NewReminderTicketHistoryEntry {
      reminderDate
      reminderSummary
      user {
        ...TicketUserFragment
      }
    }
    ... on NewReplyTicketHistoryEntry {
      reply {
        id
        user {
          ...TicketUserFragment
        }
      }
      user {
        ...TicketUserFragment
      }
    }
    ... on ReminderDeletedTicketHistoryEntry {
      reminderDate
      reminderSummary
      user {
        ...TicketUserFragment
      }
    }
    ... on ReminderUpdatedTicketHistoryEntry {
      oldReminderDate
      oldReminderSummary
      newReminderDate
      newReminderSummary
      user {
        ...TicketUserFragment
      }
    }
  }
`;
