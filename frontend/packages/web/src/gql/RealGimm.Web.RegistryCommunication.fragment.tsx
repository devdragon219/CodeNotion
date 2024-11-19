// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { AsstAddressFragmentDoc } from './RealGimm.Web.AsstAddress.fragment';
import { CityFragmentDoc } from './RealGimm.Web.City.fragment';

export type RegistryCommunicationFragment = {
  __typename?: 'RegistryCommunication';
  id: number;
  debtAmount?: number | null;
  hasAnomalies: boolean;
  isExcluded: boolean;
  contract?: {
    __typename?: 'Contract';
    id: number;
    internalCode: string;
    landlord:
      | { __typename?: 'LegalSubject'; id: number; name: string }
      | { __typename?: 'ManagementSubject'; id: number; name: string }
      | { __typename?: 'PhysicalSubject'; id: number; name: string };
    tenant:
      | { __typename?: 'LegalSubject'; id: number; name: string }
      | { __typename?: 'ManagementSubject'; id: number; name: string }
      | { __typename?: 'PhysicalSubject'; id: number; name: string };
  } | null;
  estatesUnits: Array<{
    __typename?: 'CommEstateUnit';
    id: number;
    estateUnit: {
      __typename?: 'EstateUnit';
      id: number;
      name?: string | null;
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
    };
  }>;
};

export const RegistryCommunicationFragmentDoc = gql`
  fragment RegistryCommunicationFragment on RegistryCommunication {
    id
    contract {
      id
      internalCode
      landlord {
        id
        name
      }
      tenant {
        id
        name
      }
    }
    estatesUnits {
      id
      estateUnit {
        id
        name
        internalCode
        address {
          ...AsstAddressFragment
        }
      }
    }
    debtAmount
    hasAnomalies
    isExcluded
  }
`;
