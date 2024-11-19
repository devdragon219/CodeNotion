import { TableFragment } from '../../../../../gql/RealGimm.Web.Table.fragment';
import { TaxCalculatorFragment } from '../../../../../gql/RealGimm.Web.TaxCalculator.fragment';
import { TaxConfigMainTableRowFragment } from '../../../../../gql/RealGimm.Web.TaxConfigMainTableRow.fragment';

export interface TaxConfigSubTableDialogProps {
  calculator: TaxCalculatorFragment;
  row: TaxConfigMainTableRowFragment;
  subTable: TableFragment;
  table: TableFragment;
  onClose: () => void;
}
