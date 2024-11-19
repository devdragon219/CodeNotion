// @ts-nocheck
import * as Types from '@realgimm5/frontend-common/gql/types';
import gql from 'graphql-tag';

import { CalendarDayFragmentDoc } from './RealGimm.Web.CalendarDay.fragment';

export type CalendarFragment = {
  __typename?: 'Calendar';
  name: string;
  timeZoneId: string;
  id: number;
  sunday?: {
    __typename?: 'CalendarDay';
    dayOfWeek: Types.DayOfWeek;
    id: number;
    timeRanges: Array<{ __typename?: 'TimeRange'; since: string; until: string }>;
  } | null;
  monday?: {
    __typename?: 'CalendarDay';
    dayOfWeek: Types.DayOfWeek;
    id: number;
    timeRanges: Array<{ __typename?: 'TimeRange'; since: string; until: string }>;
  } | null;
  tuesday?: {
    __typename?: 'CalendarDay';
    dayOfWeek: Types.DayOfWeek;
    id: number;
    timeRanges: Array<{ __typename?: 'TimeRange'; since: string; until: string }>;
  } | null;
  wednesday?: {
    __typename?: 'CalendarDay';
    dayOfWeek: Types.DayOfWeek;
    id: number;
    timeRanges: Array<{ __typename?: 'TimeRange'; since: string; until: string }>;
  } | null;
  thursday?: {
    __typename?: 'CalendarDay';
    dayOfWeek: Types.DayOfWeek;
    id: number;
    timeRanges: Array<{ __typename?: 'TimeRange'; since: string; until: string }>;
  } | null;
  friday?: {
    __typename?: 'CalendarDay';
    dayOfWeek: Types.DayOfWeek;
    id: number;
    timeRanges: Array<{ __typename?: 'TimeRange'; since: string; until: string }>;
  } | null;
  saturday?: {
    __typename?: 'CalendarDay';
    dayOfWeek: Types.DayOfWeek;
    id: number;
    timeRanges: Array<{ __typename?: 'TimeRange'; since: string; until: string }>;
  } | null;
  holidays: Array<{
    __typename?: 'Holiday';
    name: string;
    date: string;
    periodicity: Types.HolidayPeriodicity;
    id: number;
  }>;
};

export const CalendarFragmentDoc = gql`
  fragment CalendarFragment on Calendar {
    name
    timeZoneId
    sunday {
      ...CalendarDayFragment
    }
    monday {
      ...CalendarDayFragment
    }
    tuesday {
      ...CalendarDayFragment
    }
    wednesday {
      ...CalendarDayFragment
    }
    thursday {
      ...CalendarDayFragment
    }
    friday {
      ...CalendarDayFragment
    }
    saturday {
      ...CalendarDayFragment
    }
    holidays {
      name
      date
      periodicity
      id
    }
    id
  }
`;
