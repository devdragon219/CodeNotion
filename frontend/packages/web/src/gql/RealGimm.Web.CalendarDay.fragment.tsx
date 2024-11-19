// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

export type CalendarDayFragment = {
  __typename?: 'CalendarDay';
  dayOfWeek: Types.DayOfWeek;
  id: number;
  timeRanges: Array<{ __typename?: 'TimeRange'; since: string; until: string }>;
};

export const CalendarDayFragmentDoc = gql`
  fragment CalendarDayFragment on CalendarDay {
    dayOfWeek
    timeRanges {
      since
      until
    }
    id
  }
`;
