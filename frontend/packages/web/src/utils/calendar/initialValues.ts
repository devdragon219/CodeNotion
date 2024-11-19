import {
  CalendarDayFormInput,
  CalendarDayTimeRangeFormInput,
  CalendarFormInput,
  CalendarHolidayFormInput,
} from '../../interfaces/FormInputs/Calendar';

export const getEmptyCalendarDayTimeRangeFormInput = (enabled = false): CalendarDayTimeRangeFormInput => ({
  enabled,
  since: null,
  until: null,
});

export const getEmptyCalendarDayFormInput = (): CalendarDayFormInput => ({
  calendarDayId: null,
  enabled: false,
  timeRanges: [getEmptyCalendarDayTimeRangeFormInput()],
});

export const getEmptyCalendarHolidayFormInput = (): CalendarHolidayFormInput => ({
  calendarHolidayId: null,
  date: null,
  name: '',
  periodicity: null,
});

export const getEmptyCalendarFormInput = (): CalendarFormInput => ({
  calendarId: null,
  FRIDAY: getEmptyCalendarDayFormInput(),
  holidays: [],
  MONDAY: getEmptyCalendarDayFormInput(),
  name: '',
  SATURDAY: getEmptyCalendarDayFormInput(),
  SUNDAY: getEmptyCalendarDayFormInput(),
  THURSDAY: getEmptyCalendarDayFormInput(),
  timeZone: null,
  TUESDAY: getEmptyCalendarDayFormInput(),
  WEDNESDAY: getEmptyCalendarDayFormInput(),
});
