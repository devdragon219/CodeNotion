// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type FloorTemplateFragment = {
  __typename?: 'FloorTemplate';
  id: number;
  guid: string;
  name: string;
  position: number;
};

export const FloorTemplateFragmentDoc = gql`
  fragment FloorTemplateFragment on FloorTemplate {
    id
    guid
    name
    position
  }
`;
