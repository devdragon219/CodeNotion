// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { CatalogueCategoryFragmentDoc } from './RealGimm.Web.CatalogueCategory.fragment';
import { CatalogueSubCategoryFragmentDoc } from './RealGimm.Web.CatalogueSubCategory.fragment';
import {
  CatalogueCategoryCatalogueTypeDetailFragmentDoc,
  CatalogueTypeDetailFragmentDoc,
  FacilityCatalogueTypeFragmentDoc,
} from './RealGimm.Web.CatalogueType.fragment';
import { CatalogueTypeActivityFragmentDoc } from './RealGimm.Web.CatalogueTypeActivity.fragment';
import { CatalogueTypeFieldFragmentDoc } from './RealGimm.Web.CatalogueTypeField.fragment';
import { UsageTypeFragmentDoc } from './RealGimm.Web.EstateUsageType.fragment';
import { FacilityContractTicketFragmentDoc } from './RealGimm.Web.Ticket.fragment';
import { TicketsPerEstateUnitFragmentDoc } from './RealGimm.Web.TicketsPerEstateUnit.fragment';

export type TicketsPerEstateUnitsPerYearFragment = {
  __typename?: 'TicketsPerEstateUnitsPerYear';
  requestYear: number;
  tickets: Array<{
    __typename?: 'TicketsPerEstateUnit';
    locationEstateUnit: { __typename?: 'EstateUnit'; id: number; internalCode: string };
    tickets: Array<{
      __typename?: 'Ticket';
      id: number;
      internalCode: string;
      description?: string | null;
      masterStatus: Types.TicketMasterStatus;
      dueDate: string;
      requestDateTime: string;
      catalogueType: {
        __typename?: 'CatalogueType';
        id: number;
        internalCode: string;
        name: string;
        notes?: string | null;
        category: {
          __typename?: 'CatalogueCategory';
          name: string;
          internalCode: string;
          id: number;
          subCategories: Array<{ __typename?: 'CatalogueSubCategory'; name: string; internalCode: string; id: number }>;
          catalogueTypes: Array<{
            __typename?: 'CatalogueType';
            id: number;
            internalCode: string;
            name: string;
            notes?: string | null;
            subCategory?: {
              __typename?: 'CatalogueSubCategory';
              name: string;
              internalCode: string;
              id: number;
            } | null;
            activities: Array<{
              __typename?: 'CatalogueTypeActivity';
              activityType: Types.CatalogueTypeActivityType;
              id: number;
              name: string;
              isMandatoryByLaw: boolean;
            }>;
            usageTypes: Array<{
              __typename?: 'EstateUsageType';
              id: number;
              name: string;
              internalCode: string;
              ordering: number;
              isForEstate: boolean;
              isForEstateUnit: boolean;
              isForEstateSubUnit: boolean;
              isForContracts: boolean;
            }>;
            fields?: Array<
              Array<{
                __typename?: 'CatalogueTypeField';
                name: string;
                isMandatory: boolean;
                type: Types.CustomFieldType;
                validValues?: Array<string> | null;
                id: string;
              }>
            > | null;
          }>;
        };
        subCategory?: { __typename?: 'CatalogueSubCategory'; name: string; internalCode: string; id: number } | null;
        activities: Array<{
          __typename?: 'CatalogueTypeActivity';
          activityType: Types.CatalogueTypeActivityType;
          id: number;
          name: string;
          isMandatoryByLaw: boolean;
        }>;
        usageTypes: Array<{
          __typename?: 'EstateUsageType';
          id: number;
          name: string;
          internalCode: string;
          ordering: number;
          isForEstate: boolean;
          isForEstateUnit: boolean;
          isForEstateSubUnit: boolean;
          isForContracts: boolean;
        }>;
        fields?: Array<
          Array<{
            __typename?: 'CatalogueTypeField';
            name: string;
            isMandatory: boolean;
            type: Types.CustomFieldType;
            validValues?: Array<string> | null;
            id: string;
          }>
        > | null;
      };
      catalogueItems: Array<{ __typename?: 'CatalogueItem'; id: number; internalCode: string }>;
      supplierSubject:
        | { __typename?: 'LegalSubject'; id: number; name: string }
        | { __typename?: 'ManagementSubject'; id: number; name: string }
        | { __typename?: 'PhysicalSubject'; id: number; name: string };
      plannedTeam?: { __typename?: 'WorkTeam'; id: number; description: string } | null;
      plannedTeamLeaderUser?: {
        __typename?: 'User';
        id: number;
        firstName?: string | null;
        lastName?: string | null;
        userName: string;
      } | null;
    }>;
  }>;
};

export const TicketsPerEstateUnitsPerYearFragmentDoc = gql`
  fragment TicketsPerEstateUnitsPerYearFragment on TicketsPerEstateUnitsPerYear {
    requestYear
    tickets {
      ...TicketsPerEstateUnitFragment
    }
  }
`;
