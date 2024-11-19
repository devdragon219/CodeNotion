import { ParseKeys } from 'i18next';

import { DashboardWidgetPeriod } from '../../../../../enums/DashboardWidgetPeriod';

export const ContractsRecapWidgetPeriods = [DashboardWidgetPeriod.Month, DashboardWidgetPeriod.Year] as const;
export type ContractsRecapWidgetPeriod = (typeof ContractsRecapWidgetPeriods)[number];

export interface ContractsRecapWidgetItemProps {
  label: ParseKeys;
  values: Record<ContractsRecapWidgetPeriod, number[]>;
  type: 'currency' | 'number';
  colorPalette: 'light' | 'dark';
}
