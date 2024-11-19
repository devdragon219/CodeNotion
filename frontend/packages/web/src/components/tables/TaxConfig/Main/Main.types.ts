import { TaxConfigTableProps } from '../TaxConfig.types';

export type TaxConfigMainTableProps = Omit<TaxConfigTableProps, 'subTable' | 'year'>;
