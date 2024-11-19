// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type EstateSurfacesFragment = {
  __typename?: 'EstateSurfaces';
  metric: Types.SurfaceMeasurementMetric;
  heritageType: Types.EstateUnitHeritageType;
  surfaceSqMTotal: number;
  surfaceSqMCommonArea: number;
  surfaceSqMSideArea: number;
};

export const EstateSurfacesFragmentDoc = gql`
  fragment EstateSurfacesFragment on EstateSurfaces {
    metric
    heritageType
    surfaceSqMTotal
    surfaceSqMCommonArea
    surfaceSqMSideArea
  }
`;
