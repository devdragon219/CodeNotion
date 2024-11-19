import { parseISO } from 'date-fns';

export const MAX_YEAR = 2200;
export const MIN_YEAR = 1900;

export const MAX_DATE = parseISO(`${MAX_YEAR}-12-31`);
export const MIN_DATE = parseISO(`${MIN_YEAR}-01-01`);
