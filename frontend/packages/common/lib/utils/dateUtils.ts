import { differenceInDays, format, formatISO, formatISODuration, isBefore } from 'date-fns';

import { isValidDate } from './typeNarrowings/isValidDate';

export const parseDateToLocalizedString = (
  date: Date | null,
  language: string,
  options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: undefined,
    minute: undefined,
    second: undefined,
  },
) => {
  const hasDateOption = [options.day, options.month, options.year, options.era, options.weekday].some((it) => !!it);
  const hasTimeOption = [options.hour, options.minute, options.second].some((it) => !!it);

  if (!hasDateOption || !hasTimeOption) {
    return date?.toLocaleString(language, options);
  }

  const dateString = date?.toLocaleString(language, {
    ...options,
    hour: undefined,
    minute: undefined,
    second: undefined,
  });
  const timeString = date?.toLocaleString(language, {
    ...options,
    day: undefined,
    month: undefined,
    year: undefined,
    era: undefined,
    weekday: undefined,
  });

  return [dateString, timeString].filter((it) => !!it).join(' - ');
};

export const parseDateToString = (date: Date | null, representation: 'complete' | 'date' | 'time' = 'date') =>
  date ? (representation === 'time' ? format(date, 'HH:mm') : formatISO(date, { representation })) : null;

export const parseTimeToString = (date: Date | null) =>
  date
    ? formatISODuration({
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
      })
    : null;

export const getFirstDateOfYear = () => new Date(new Date().getFullYear(), 0, 1);

export const getDifferenceInDays = (startDate?: Date | null, endDate?: Date | null): number | null =>
  isValidDate(startDate) && isValidDate(endDate) && isBefore(startDate, endDate)
    ? differenceInDays(endDate, startDate)
    : null;

export const getMonthForIndex = (
  index: number,
  language: string,
  month: Intl.DateTimeFormatOptions['month'] = 'short',
) => {
  const string = parseDateToLocalizedString(new Date(0, index, 1), language, { month });
  if (!string) return undefined;

  return `${string[0].toUpperCase()}${string.slice(1).toLowerCase()}`;
};
