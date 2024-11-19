import { CURRENCY } from '../configs/currency';

export const parseNumberToCurrency = (value: number | null | undefined, language: string, currency = CURRENCY) =>
  typeof value === 'number' && !isNaN(value)
    ? Intl.NumberFormat(language, { style: 'currency', currency, currencyDisplay: 'narrowSymbol' }).format(value)
    : '';
