// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type NotificationFragment_CatalogueItemDocumentExpiredNotification = {
  __typename: 'CatalogueItemDocumentExpiredNotification';
  estateId: number;
  catalogueTypeId: number;
  entityId: number;
  username: string;
  timestamp: string;
  status: Types.NotificationStatus;
  id: number;
};

export type NotificationFragment_ContractDocumentExpiredNotification = {
  __typename: 'ContractDocumentExpiredNotification';
  isContractActive: boolean;
  isContractSublocated: boolean;
  entityId: number;
  username: string;
  timestamp: string;
  status: Types.NotificationStatus;
  id: number;
};

export type NotificationFragment_ContractsExpirationNotification = {
  __typename: 'ContractsExpirationNotification';
  contractIds: Array<number>;
  daysToExpiration: number;
  isActiveContracts: boolean;
  username: string;
  timestamp: string;
  status: Types.NotificationStatus;
  id: number;
};

export type NotificationFragment_CostChargesExpirationNotification = {
  __typename: 'CostChargesExpirationNotification';
  costChargeIds: Array<number>;
  daysToExpiration: number;
  username: string;
  timestamp: string;
  status: Types.NotificationStatus;
  id: number;
};

export type NotificationFragment_EstateDocumentExpiredNotification = {
  __typename: 'EstateDocumentExpiredNotification';
  entityId: number;
  username: string;
  timestamp: string;
  status: Types.NotificationStatus;
  id: number;
};

export type NotificationFragment_EstatePortfolioExportIsReadyNotification = {
  __typename: 'EstatePortfolioExportIsReadyNotification';
  downloadGuid?: string | null;
  username: string;
  timestamp: string;
  status: Types.NotificationStatus;
  id: number;
};

export type NotificationFragment_EstateUnitDocumentExpiredNotification = {
  __typename: 'EstateUnitDocumentExpiredNotification';
  entityId: number;
  username: string;
  timestamp: string;
  status: Types.NotificationStatus;
  id: number;
};

export type NotificationFragment_PasswordExpirationNotification = {
  __typename: 'PasswordExpirationNotification';
  passwordExpirationDate: string;
  username: string;
  timestamp: string;
  status: Types.NotificationStatus;
  id: number;
};

export type NotificationFragment_SubjectDocumentExpiredNotification = {
  __typename: 'SubjectDocumentExpiredNotification';
  entityId: number;
  username: string;
  timestamp: string;
  status: Types.NotificationStatus;
  id: number;
};

export type NotificationFragment =
  | NotificationFragment_CatalogueItemDocumentExpiredNotification
  | NotificationFragment_ContractDocumentExpiredNotification
  | NotificationFragment_ContractsExpirationNotification
  | NotificationFragment_CostChargesExpirationNotification
  | NotificationFragment_EstateDocumentExpiredNotification
  | NotificationFragment_EstatePortfolioExportIsReadyNotification
  | NotificationFragment_EstateUnitDocumentExpiredNotification
  | NotificationFragment_PasswordExpirationNotification
  | NotificationFragment_SubjectDocumentExpiredNotification;

export const NotificationFragmentDoc = gql`
  fragment NotificationFragment on Notification {
    __typename
    username
    timestamp
    status
    id
    ... on CatalogueItemDocumentExpiredNotification {
      estateId
      catalogueTypeId
      entityId
    }
    ... on ContractDocumentExpiredNotification {
      isContractActive
      isContractSublocated
      entityId
    }
    ... on ContractsExpirationNotification {
      contractIds
      daysToExpiration
      isActiveContracts
    }
    ... on CostChargesExpirationNotification {
      costChargeIds
      daysToExpiration
    }
    ... on EstateDocumentExpiredNotification {
      entityId
    }
    ... on EstatePortfolioExportIsReadyNotification {
      downloadGuid
    }
    ... on EstateUnitDocumentExpiredNotification {
      entityId
    }
    ... on PasswordExpirationNotification {
      passwordExpirationDate
    }
    ... on SubjectDocumentExpiredNotification {
      entityId
    }
  }
`;
