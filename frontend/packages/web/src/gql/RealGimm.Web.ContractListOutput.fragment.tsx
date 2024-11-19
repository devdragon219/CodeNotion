// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { AsstAddressFragmentDoc } from './RealGimm.Web.AsstAddress.fragment';
import { CityFragmentDoc } from './RealGimm.Web.City.fragment';

export type ContractFragment = {
  __typename?: 'ContractListOutput';
  id: number;
  isActive: boolean;
  internalCode: string;
  externalCode?: string | null;
  counterpartName?: string | null;
  typeDescription?: string | null;
  isSublocated: boolean;
  status: Types.EntryStatus;
  effectStartDate: string;
  expirationDate?: string | null;
  daysToExpiration?: number | null;
  managementSubjectName?: string | null;
  releaseDate?: string | null;
  releaseReason?: Types.ReleaseReason | null;
  isOccupiedWithoutRight?: boolean | null;
  terminationDate?: string | null;
  terminator?: Types.ContractTerminator | null;
  firstTermDurationMonths?: number | null;
  secondTermDurationMonths?: number | null;
  firstTermExpirationDate?: string | null;
  secondTermExpirationDate?: string | null;
  anytimeTerminationWarningMonths?: number | null;
  nonRenewalWarningMonths?: number | null;
  reason: Types.Reason;
  agreementDate: string;
  lastRenewalStartDate: string;
  locatedUnits: Array<{
    __typename?: 'ContractListLocatedUnitOutput';
    estateUnitOrSubUnitInternalCode?: string | null;
    estateUnitName?: string | null;
    isMainUnit: boolean;
    isRegistryUpdateEnabled: boolean;
    isPartialLocation: boolean;
    surfaceSqM?: number | null;
    estateUnitAddress?: {
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
    } | null;
  }>;
};

export const ContractFragmentDoc = gql`
  fragment ContractFragment on ContractListOutput {
    id
    isActive
    internalCode
    externalCode
    counterpartName
    typeDescription
    isSublocated
    status
    effectStartDate
    expirationDate
    daysToExpiration
    locatedUnits {
      estateUnitOrSubUnitInternalCode
      estateUnitName
      estateUnitAddress {
        ...AsstAddressFragment
      }
      isMainUnit
      isRegistryUpdateEnabled
      isPartialLocation
      surfaceSqM
    }
    managementSubjectName
    releaseDate
    releaseReason
    isOccupiedWithoutRight
    terminationDate
    terminator
    firstTermDurationMonths
    secondTermDurationMonths
    firstTermExpirationDate
    secondTermExpirationDate
    anytimeTerminationWarningMonths
    nonRenewalWarningMonths
    reason
    agreementDate
    lastRenewalStartDate
  }
`;
