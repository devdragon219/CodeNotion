import { Month } from '../enums/Month';

export const parseMonthIndexToMonth = (index: number | null | undefined) =>
  index ? Object.values(Month)[index - 1] : null;
export const parseMonthToMonthIndex = (month: Month | null) => (month ? Object.values(Month).indexOf(month) + 1 : null);
