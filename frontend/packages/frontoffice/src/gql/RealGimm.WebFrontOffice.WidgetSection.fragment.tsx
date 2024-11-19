// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type WidgetSectionFragment = {
  __typename?: 'WidgetSection';
  id: number;
  title?: string | null;
  backgroundColor?: string | null;
  rows: Array<{
    __typename?: 'WidgetSectionRow';
    id: number;
    widgets: Array<{ __typename?: 'WidgetConfig'; id: number; type: string; width: number }>;
  }>;
};

export const WidgetSectionFragmentDoc = gql`
  fragment WidgetSectionFragment on WidgetSection {
    id
    title
    backgroundColor
    rows {
      id
      widgets {
        id
        type
        width
      }
    }
  }
`;
