// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type CadastralCoordinatesFragment = {
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
};

export const CadastralCoordinatesFragmentDoc = gql`
  fragment CadastralCoordinatesFragment on CadastralCoordinates {
    coordinateType
    unmanagedOverride
    level1
    level2
    level3
    level4
    level5
    itTavPartita
    itTavCorpo
    itTavPorzione
    hasITTavData
    notes
    id
  }
`;
