// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type CalendarTicketOutputFragment = {
  __typename?: 'CalendarTicketOutput';
  id?: number | null;
  mainType: Types.TicketMainType;
  dueDate: string;
  internalCode?: string | null;
  workOrderReference?: string | null;
  description?: string | null;
  masterStatus?: Types.TicketMasterStatus | null;
  requestor?: string | null;
  isExcludedFromMaintenanceContract: boolean;
  supplierSubject:
    | { __typename?: 'LegalSubject'; id: number; name: string }
    | { __typename?: 'ManagementSubject'; id: number; name: string }
    | { __typename?: 'PhysicalSubject'; id: number; name: string };
};

export const CalendarTicketOutputFragmentDoc = gql`
  fragment CalendarTicketOutputFragment on CalendarTicketOutput {
    id
    mainType
    dueDate
    internalCode
    workOrderReference
    description
    masterStatus
    requestor
    isExcludedFromMaintenanceContract
    supplierSubject {
      id
      name
    }
  }
`;
