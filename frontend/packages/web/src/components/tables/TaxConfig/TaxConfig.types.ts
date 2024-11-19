import { TaxCalculatorFragment } from '../../../gql/RealGimm.Web.TaxCalculator.fragment';

export interface TaxConfigTableProps {
  calculator: TaxCalculatorFragment;
  subTable?: {
    code: string;
    color?: 'primary' | 'secondary';
    year: number;
  };
  tableCode: string;
}
