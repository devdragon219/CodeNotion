import { DayOfWeek, HolidayPeriodicity } from '@realgimm5/frontend-common/gql/types';

export interface CalendarDayTimeRangeFormInput {
  enabled: boolean;
  since: Date | null;
  until: Date | null;
}

export interface CalendarDayFormInput {
  calendarDayId: number | null;
  enabled: boolean;
  timeRanges: CalendarDayTimeRangeFormInput[];
}

export interface CalendarHolidayFormInput {
  calendarHolidayId: number | null;
  date: Date | null;
  name: string;
  periodicity: HolidayPeriodicity | null;
}

export type CalendarFormInput = {
  calendarId: number | null;
  holidays: CalendarHolidayFormInput[];
  name: string;
  timeZone: string | null;
} & {
  [day in DayOfWeek]: CalendarDayFormInput;
};
