import { parseISO } from 'date-fns';
import { parse } from 'tinyduration';

import { parseDateToLocalizedString } from './dateUtils';

export const getFullName = (firstName?: string | null, lastName?: string | null, fallback?: string | null): string => {
  const fullName = [lastName, firstName].filter((it) => !!it).join(' ');
  return fullName.length === 0 ? (fallback ?? '') : fullName;
};

export const getStringOrNull = (value?: string | null) => (value?.trim().length ? value : null);

export const parseStringToDate = (string?: string | null) => (string ? parseISO(string) : null);

export const parseStringToDuration = (string?: string | null) => {
  if (!string) return null;

  return parse(string);
};

export const parseStringToTime = (string?: string | null) => {
  const duration = parseStringToDuration(string);
  if (!duration) return null;

  const date = new Date();
  date.setHours(duration.hours ?? 0);
  date.setMinutes(duration.minutes ?? 0);
  date.setSeconds(duration.seconds ?? 0);

  return date;
};

export const parseStringToLocalizedDate = (
  string: string | null | undefined,
  language: string,
  options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: undefined,
    minute: undefined,
    second: undefined,
  },
) => parseDateToLocalizedString(parseStringToDate(string), language, options);
