import { CalendarDayInput, CalendarInput } from '@realgimm5/frontend-common/gql/types';
import { parseDateToString, parseTimeToString } from '@realgimm5/frontend-common/utils';

import { CalendarDayFormInput, CalendarFormInput } from '../../interfaces/FormInputs/Calendar';

const parseCalendarDayFormInputToCalendarDay = (calendarDay: CalendarDayFormInput): CalendarDayInput | null =>
  calendarDay.enabled
    ? {
        id: calendarDay.calendarDayId,
        timeRanges: calendarDay.timeRanges.map((timeRange) => ({
          since: parseTimeToString(timeRange.since)!,
          until: parseTimeToString(timeRange.until)!,
        })),
      }
    : null;

export const parseCalendarFormInputToCalendarInput = (calendar: CalendarFormInput): CalendarInput => ({
  friday: parseCalendarDayFormInputToCalendarDay(calendar.FRIDAY),
  holidays: calendar.holidays.map((holiday) => ({
    date: parseDateToString(holiday.date)!,
    id: holiday.calendarHolidayId,
    name: holiday.name,
    periodicity: holiday.periodicity!,
  })),
  monday: parseCalendarDayFormInputToCalendarDay(calendar.MONDAY),
  name: calendar.name,
  saturday: parseCalendarDayFormInputToCalendarDay(calendar.SATURDAY),
  sunday: parseCalendarDayFormInputToCalendarDay(calendar.SUNDAY),
  thursday: parseCalendarDayFormInputToCalendarDay(calendar.THURSDAY),
  timeZoneId: calendar.timeZone!,
  tuesday: parseCalendarDayFormInputToCalendarDay(calendar.TUESDAY),
  wednesday: parseCalendarDayFormInputToCalendarDay(calendar.WEDNESDAY),
});
