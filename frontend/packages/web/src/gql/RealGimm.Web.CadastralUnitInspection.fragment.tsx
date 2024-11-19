// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type CadastralUnitInspectionFragment = {
  __typename?: 'CadastralUnitInspection';
  date?: string | null;
  protocolDate?: string | null;
  protocolNumber?: string | null;
  heading?: string | null;
  macroZone?: string | null;
  microZone?: string | null;
  isHistoricalEstate: boolean;
  isDirectRestriction: boolean;
};

export const CadastralUnitInspectionFragmentDoc = gql`
  fragment CadastralUnitInspectionFragment on CadastralUnitInspection {
    date
    protocolDate
    protocolNumber
    heading
    macroZone
    microZone
    isHistoricalEstate
    isDirectRestriction
  }
`;
