// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { AsstAddressFragmentDoc } from './RealGimm.Web.AsstAddress.fragment';
import { CadastralCoordinatesFragmentDoc } from './RealGimm.Web.CadastralCoordinates.fragment';
import { CityFragmentDoc } from './RealGimm.Web.City.fragment';
import { EstateUnitDetailFragmentDoc, EstateUnitFragmentDoc } from './RealGimm.Web.EstateUnit.fragment';
import { FloorFragmentDoc } from './RealGimm.Web.Floor.fragment';
import { StairFragmentDoc } from './RealGimm.Web.Stair.fragment';

export type TicketChecklistsPerEstateUnitFragment = {
  __typename?: 'TicketChecklistsPerEstateUnit';
  estateUnitId: number;
  estateUnit: {
    __typename?: 'EstateUnit';
    id: number;
    internalCode: string;
    type: Types.EstateUnitType;
    subNumbering?: string | null;
    externalCode?: string | null;
    name?: string | null;
    netSurface?: number | null;
    grossSurface?: number | null;
    ownershipStartDate: string;
    status: Types.EstateUnitStatus;
    sharedArea: boolean;
    disusedDate?: string | null;
    ownershipType: Types.EstateUnitOwnershipType;
    ownershipEndDate?: string | null;
    ownershipPercent?: number | null;
    notes?: string | null;
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
    stair?: { __typename?: 'Stair'; id: number; description: string } | null;
    floors: Array<{ __typename?: 'Floor'; id: number; name: string; position: number; templateReference: string }>;
    estate: {
      __typename?: 'Estate';
      id: number;
      internalCode: string;
      name?: string | null;
      type: Types.EstateType;
      managementSubject:
        | { __typename?: 'LegalSubject'; name: string; id: number }
        | { __typename?: 'ManagementSubject'; name: string; id: number }
        | { __typename?: 'PhysicalSubject'; name: string; id: number };
    };
    currentCadastralUnit?: {
      __typename?: 'CadastralUnit';
      id: number;
      since?: string | null;
      isCadastralRegistrationInProgress: boolean;
      isAncillaryUnit: boolean;
      coordinates: Array<{
        __typename?: 'CadastralCoordinates';
        coordinateType: Types.CoordinateType;
        unmanagedOverride?: string | null;
        level1?: string | null;
        level2?: string | null;
        level3?: string | null;
        level4?: string | null;
        level5?: string | null;
        itTavPartita?: string | null;
        itTavCorpo?: string | null;
        itTavPorzione?: string | null;
        hasITTavData: boolean;
        notes?: string | null;
        id: number;
      }>;
    } | null;
    usageType: { __typename?: 'EstateUsageType'; id: number; name: string };
  };
  ticketChecklists: Array<{
    __typename?: 'TicketChecklist';
    internalCode: string;
    name: string;
    type: Types.TicketChecklistTemplateType;
    costBaseFactor: Types.CostBaseFactor;
    rawWorkCost: number;
    safetyCost: number;
    id: number;
    catalogueType: {
      __typename?: 'CatalogueType';
      id: number;
      category: { __typename?: 'CatalogueCategory'; id: number; name: string };
      subCategory?: { __typename?: 'CatalogueSubCategory'; id: number; name: string } | null;
    };
  }>;
};

export const TicketChecklistsPerEstateUnitFragmentDoc = gql`
  fragment TicketChecklistsPerEstateUnitFragment on TicketChecklistsPerEstateUnit {
    estateUnitId
    estateUnit {
      ...EstateUnitFragment
    }
    ticketChecklists {
      internalCode
      name
      catalogueType {
        id
        category {
          id
          name
        }
        subCategory {
          id
          name
        }
      }
      type
      costBaseFactor
      rawWorkCost
      safetyCost
      id
    }
  }
`;
