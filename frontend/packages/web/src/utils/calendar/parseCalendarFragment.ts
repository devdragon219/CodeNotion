import { DayOfWeek } from '@realgimm5/frontend-common/gql/types';
import { parseStringToDate, parseStringToTime } from '@realgimm5/frontend-common/utils';

import { CalendarFragment } from '../../gql/RealGimm.Web.Calendar.fragment';
import { CalendarDayFragment } from '../../gql/RealGimm.Web.CalendarDay.fragment';
import { CalendarDayFormInput, CalendarFormInput } from '../../interfaces/FormInputs/Calendar';
import { getEmptyCalendarDayFormInput } from './initialValues';

const parseCalendarDayToCalendarDayFormInput = (calendarDay?: CalendarDayFragment | null): CalendarDayFormInput =>
  calendarDay
    ? {
        calendarDayId: calendarDay.id,
        enabled: true,
        timeRanges: calendarDay.timeRanges.map((timeRange) => ({
          enabled: true,
          since: parseStringToTime(timeRange.since),
          until: parseStringToTime(timeRange.until),
        })),
      }
    : getEmptyCalendarDayFormInput();

export const parseCalendarToCalendarFormInput = (calendar: CalendarFragment): CalendarFormInput => ({
  calendarId: calendar.id,
  [DayOfWeek.Friday]: parseCalendarDayToCalendarDayFormInput(calendar.friday),
  holidays: calendar.holidays.map((holiday) => ({
    calendarHolidayId: holiday.id,
    date: parseStringToDate(holiday.date),
    name: holiday.name,
    periodicity: holiday.periodicity,
  })),
  [DayOfWeek.Monday]: parseCalendarDayToCalendarDayFormInput(calendar.monday),
  name: calendar.name,
  [DayOfWeek.Saturday]: parseCalendarDayToCalendarDayFormInput(calendar.saturday),
  [DayOfWeek.Sunday]: parseCalendarDayToCalendarDayFormInput(calendar.sunday),
  [DayOfWeek.Thursday]: parseCalendarDayToCalendarDayFormInput(calendar.thursday),
  timeZone: calendar.timeZoneId,
  [DayOfWeek.Tuesday]: parseCalendarDayToCalendarDayFormInput(calendar.tuesday),
  [DayOfWeek.Wednesday]: parseCalendarDayToCalendarDayFormInput(calendar.wednesday),
});
