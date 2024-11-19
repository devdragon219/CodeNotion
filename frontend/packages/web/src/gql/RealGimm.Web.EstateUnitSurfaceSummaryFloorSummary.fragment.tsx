// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type EstateUnitSurfaceSummaryFloorSummaryFragment = {
  __typename?: 'EstateUnitSurfaceSummaryFloorSummary';
  id?: number | null;
  name?: string | null;
  position: number;
  templateReference?: string | null;
};

export const EstateUnitSurfaceSummaryFloorSummaryFragmentDoc = gql`
  fragment EstateUnitSurfaceSummaryFloorSummaryFragment on EstateUnitSurfaceSummaryFloorSummary {
    id
    name
    position
    templateReference
  }
`;
