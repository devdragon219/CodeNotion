// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type AuditLogFragment = {
  __typename?: 'AuditLog';
  id: number;
  tablePk: string;
  entityType: string;
  auditUser: string;
  action: string;
  auditDate: string;
  auditData?: string | null;
};

export const AuditLogFragmentDoc = gql`
  fragment AuditLogFragment on AuditLog {
    id
    tablePk
    entityType
    auditUser
    action
    auditDate
    auditData
  }
`;
