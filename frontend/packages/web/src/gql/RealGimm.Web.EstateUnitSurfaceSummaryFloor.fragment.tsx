// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { EstateUnitSurfaceSummaryFloorSummaryFragmentDoc } from './RealGimm.Web.EstateUnitSurfaceSummaryFloorSummary.fragment';

export type EstateUnitSurfaceSummaryFloorFragment = {
  __typename?: 'EstateUnitSurfaceSummaryFloor';
  surfaceId?: number | null;
  surfaceSqMTotal?: number | null;
  surfaceSqMCommonArea?: number | null;
  surfaceSqMSideArea?: number | null;
  floor: {
    __typename?: 'EstateUnitSurfaceSummaryFloorSummary';
    id?: number | null;
    name?: string | null;
    position: number;
    templateReference?: string | null;
  };
  functionAreas: Array<{
    __typename?: 'EstateUnitSurfaceSummaryFunctionArea';
    surfaceId?: number | null;
    surfaceSqMTotal?: number | null;
    surfaceSqMCommonArea?: number | null;
    surfaceSqMSideArea?: number | null;
    functionArea: {
      __typename?: 'EstateUnitSurfaceSummaryFunctionAreaSummary';
      id?: number | null;
      name?: string | null;
      surfaceType: Types.SurfaceType;
    };
  }>;
};

export const EstateUnitSurfaceSummaryFloorFragmentDoc = gql`
  fragment EstateUnitSurfaceSummaryFloorFragment on EstateUnitSurfaceSummaryFloor {
    surfaceId
    surfaceSqMTotal
    surfaceSqMCommonArea
    surfaceSqMSideArea
    floor {
      ...EstateUnitSurfaceSummaryFloorSummaryFragment
    }
    functionAreas {
      surfaceId
      surfaceSqMTotal
      surfaceSqMCommonArea
      surfaceSqMSideArea
      functionArea {
        id
        name
        surfaceType
      }
    }
  }
`;
