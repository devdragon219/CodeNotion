// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { EstateUnitSurfaceSummaryFloorFragmentDoc } from './RealGimm.Web.EstateUnitSurfaceSummaryFloor.fragment';
import { EstateUnitSurfaceSummaryFloorSummaryFragmentDoc } from './RealGimm.Web.EstateUnitSurfaceSummaryFloorSummary.fragment';

export type EstateUnitSurfaceSummaryFragment = {
  __typename?: 'EstateUnitSurfaceSummary';
  surfaceId?: number | null;
  metric: Types.SurfaceMeasurementMetric;
  surfaceSqMTotal?: number | null;
  surfaceSqMCommonArea?: number | null;
  surfaceSqMSideArea?: number | null;
  floors: Array<{
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
  }>;
};

export const EstateUnitSurfaceSummaryFragmentDoc = gql`
  fragment EstateUnitSurfaceSummaryFragment on EstateUnitSurfaceSummary {
    surfaceId
    metric
    surfaceSqMTotal
    surfaceSqMCommonArea
    surfaceSqMSideArea
    floors {
      ...EstateUnitSurfaceSummaryFloorFragment
    }
  }
`;
