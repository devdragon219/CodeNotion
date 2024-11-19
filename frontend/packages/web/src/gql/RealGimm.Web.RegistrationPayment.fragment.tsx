// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { AsstAddressFragmentDoc } from './RealGimm.Web.AsstAddress.fragment';
import { CityFragmentDoc } from './RealGimm.Web.City.fragment';

export type ContractRegistrationPaymentFragment = {
  __typename?: 'RegistrationPayment';
  paymentType: Types.RegistrationPaymentType;
  paymentYear: number;
  paymentCode: string;
  valueDate: string;
  taxAmount: number;
  sanctionAmount: number;
  totalAmount: number;
  id: number;
};

export type RegistrationPaymentFragment = {
  __typename?: 'RegistrationPayment';
  paymentType: Types.RegistrationPaymentType;
  paymentYear: number;
  paymentCode: string;
  valueDate: string;
  id: number;
  contract: {
    __typename?: 'Contract';
    id: number;
    internalCode: string;
    managementSubject:
      | { __typename?: 'LegalSubject'; id: number; name: string }
      | { __typename?: 'ManagementSubject'; id: number; name: string }
      | { __typename?: 'PhysicalSubject'; id: number; name: string };
    locatedUnits: Array<{
      __typename?: 'LocatedUnit';
      id: number;
      isMainUnit: boolean;
      estateUnit: {
        __typename?: 'EstateUnit';
        id: number;
        estate: {
          __typename?: 'Estate';
          id: number;
          internalCode: string;
          addresses: Array<{
            __typename?: 'AsstAddress';
            id: number;
            addressType: Types.AsstAddressType;
            cityName?: string | null;
            countryISO?: string | null;
            countyName?: string | null;
            localPostCode?: string | null;
            notes?: string | null;
            numbering?: string | null;
            toponymy?: string | null;
            city?: {
              __typename?: 'City';
              guid: string;
              id: number;
              name: string;
              countyName?: string | null;
              countryName?: string | null;
              countryISO: string;
              cadastralCode?: string | null;
            } | null;
            locationLatLon?: { __typename?: 'GeoJSONPointType'; coordinates?: Array<number> | null } | null;
          }>;
        };
      };
    }>;
  };
};

export type RegistrationPaymentDetailFragment = {
  __typename?: 'RegistrationPayment';
  paymentType: Types.RegistrationPaymentType;
  paymentYear: number;
  paymentCode: string;
  valueDate: string;
  sanctionAmount: number;
  taxAmount: number;
  id: number;
  contract: {
    __typename?: 'Contract';
    id: number;
    internalCode: string;
    managementSubject:
      | { __typename?: 'LegalSubject'; id: number; name: string }
      | { __typename?: 'ManagementSubject'; id: number; name: string }
      | { __typename?: 'PhysicalSubject'; id: number; name: string };
  };
  rows: Array<{
    __typename?: 'RegistrationPaymentRow';
    amountCleared?: number | null;
    amountDue: number;
    paymentRowCode: string;
    paymentRowReceivingEntity?: string | null;
    paymentRowSection?: string | null;
    referencePeriod?: number | null;
    referenceYear: number;
    id: number;
  }>;
};

export const ContractRegistrationPaymentFragmentDoc = gql`
  fragment ContractRegistrationPaymentFragment on RegistrationPayment {
    paymentType
    paymentYear
    paymentCode
    valueDate
    taxAmount
    sanctionAmount
    totalAmount
    id
  }
`;
export const RegistrationPaymentFragmentDoc = gql`
  fragment RegistrationPaymentFragment on RegistrationPayment {
    paymentType
    paymentYear
    paymentCode
    valueDate
    id
    contract {
      id
      internalCode
      managementSubject {
        id
        name
      }
      locatedUnits {
        id
        isMainUnit
        estateUnit {
          id
          estate {
            id
            internalCode
            addresses {
              ...AsstAddressFragment
            }
          }
        }
      }
    }
  }
`;
export const RegistrationPaymentDetailFragmentDoc = gql`
  fragment RegistrationPaymentDetailFragment on RegistrationPayment {
    paymentType
    paymentYear
    paymentCode
    valueDate
    sanctionAmount
    taxAmount
    id
    contract {
      id
      internalCode
      managementSubject {
        id
        name
      }
    }
    rows {
      amountCleared
      amountDue
      paymentRowCode
      paymentRowReceivingEntity
      paymentRowSection
      referencePeriod
      referenceYear
      id
    }
  }
`;
