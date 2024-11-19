// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { AsstAddressFragmentDoc } from './RealGimm.Web.AsstAddress.fragment';
import { BillRowFragmentDoc } from './RealGimm.Web.BillRow.fragment';
import { CityFragmentDoc } from './RealGimm.Web.City.fragment';

export type BillFragment = {
  __typename?: 'Bill';
  id: number;
  internalCode: string;
  year: number;
  isInvoiced: boolean;
  contractBillingPeriod: Types.BillingPeriod;
  isOccupiedWithoutRight: boolean;
  date: string;
  since?: string | null;
  until?: string | null;
  transactorPaymentType: Types.PaymentType;
  emissionType: Types.BillEmissionType;
  totalAmount: number;
  contract?: {
    __typename?: 'Contract';
    internalCode: string;
    managementSubject:
      | { __typename?: 'LegalSubject'; id: number; name: string }
      | { __typename?: 'ManagementSubject'; id: number; name: string }
      | { __typename?: 'PhysicalSubject'; id: number; name: string };
    type: { __typename?: 'ContractType'; id: number; description: string };
  } | null;
  counterpartSubject:
    | { __typename?: 'LegalSubject'; id: number; name: string }
    | { __typename?: 'ManagementSubject'; id: number; name: string }
    | { __typename?: 'PhysicalSubject'; id: number; name: string };
  estateUnit?: {
    __typename?: 'EstateUnit';
    id: number;
    internalCode: string;
    address: {
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
    };
  } | null;
  transactorSubject:
    | { __typename?: 'LegalSubject'; id: number; name: string }
    | { __typename?: 'ManagementSubject'; id: number; name: string }
    | { __typename?: 'PhysicalSubject'; id: number; name: string };
};

export type BillDetailFragment = {
  __typename?: 'Bill';
  isTemporary: boolean;
  year: number;
  isInvoiced: boolean;
  contractBillingPeriod: Types.BillingPeriod;
  isOccupiedWithoutRight: boolean;
  date: string;
  since?: string | null;
  until?: string | null;
  transactorPaymentType: Types.PaymentType;
  emissionType: Types.BillEmissionType;
  finalDate?: string | null;
  totalAmount: number;
  internalCode: string;
  id: number;
  contract?: {
    __typename?: 'Contract';
    internalCode: string;
    counterparts: Array<{
      __typename?: 'Counterpart';
      subject:
        | { __typename?: 'LegalSubject'; name: string; id: number }
        | { __typename?: 'ManagementSubject'; name: string; id: number }
        | { __typename?: 'PhysicalSubject'; name: string; id: number };
    }>;
    managementSubject:
      | { __typename?: 'LegalSubject'; name: string }
      | { __typename?: 'ManagementSubject'; name: string }
      | { __typename?: 'PhysicalSubject'; name: string };
    transactors: Array<{
      __typename?: 'Transactor';
      subject:
        | { __typename?: 'LegalSubject'; name: string; id: number }
        | { __typename?: 'ManagementSubject'; name: string; id: number }
        | { __typename?: 'PhysicalSubject'; name: string; id: number };
    }>;
    type: { __typename?: 'ContractType'; description: string };
  } | null;
  counterpartSubject:
    | { __typename?: 'LegalSubject'; name: string; id: number }
    | { __typename?: 'ManagementSubject'; name: string; id: number }
    | { __typename?: 'PhysicalSubject'; name: string; id: number };
  estateUnit?: {
    __typename?: 'EstateUnit';
    internalCode: string;
    address: {
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
    };
  } | null;
  transactorSubject:
    | { __typename?: 'LegalSubject'; name: string; id: number }
    | { __typename?: 'ManagementSubject'; name: string; id: number }
    | { __typename?: 'PhysicalSubject'; name: string; id: number };
  billRows: Array<{
    __typename?: 'BillRow';
    since?: string | null;
    until?: string | null;
    amount: number;
    id: number;
    itemType: {
      __typename?: 'BillItemType';
      description: string;
      id: number;
      defaultAccountingItem?: { __typename?: 'AccountingItem'; internalCode: string } | null;
    };
    vatRate: { __typename?: 'VATRate'; internalCode: string; description: string; ratePercent: number; id: number };
  }>;
};

export const BillFragmentDoc = gql`
  fragment BillFragment on Bill {
    id
    internalCode
    contract {
      internalCode
      managementSubject {
        id
        name
      }
      type {
        id
        description
      }
    }
    counterpartSubject {
      id
      name
    }
    year
    isInvoiced
    estateUnit {
      id
      internalCode
      address {
        ...AsstAddressFragment
      }
    }
    contractBillingPeriod
    isOccupiedWithoutRight
    date
    since
    until
    transactorPaymentType
    transactorSubject {
      id
      name
    }
    emissionType
    totalAmount
  }
`;
export const BillDetailFragmentDoc = gql`
  fragment BillDetailFragment on Bill {
    isTemporary
    contract {
      counterparts {
        subject {
          name
          id
        }
      }
      internalCode
      managementSubject {
        name
      }
      transactors {
        subject {
          name
          id
        }
      }
      type {
        description
      }
    }
    counterpartSubject {
      name
      id
    }
    year
    isInvoiced
    estateUnit {
      internalCode
      address {
        ...AsstAddressFragment
      }
    }
    contractBillingPeriod
    isOccupiedWithoutRight
    date
    since
    until
    transactorPaymentType
    transactorSubject {
      name
      id
    }
    emissionType
    finalDate
    totalAmount
    billRows {
      ...BillRowFragment
    }
    internalCode
    id
  }
`;
