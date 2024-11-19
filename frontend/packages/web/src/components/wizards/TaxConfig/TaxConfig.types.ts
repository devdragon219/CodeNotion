import { TableFragment } from '../../../gql/RealGimm.Web.Table.fragment';
import { TaxCalculatorFragment } from '../../../gql/RealGimm.Web.TaxCalculator.fragment';
import { TaxConfigFormInput } from '../../../interfaces/FormInputs/TaxConfig';

export interface TaxConfigCreateDialogProps {
  calculator: TaxCalculatorFragment;
  subTables: TableFragment[];
  table: TableFragment;
  onClose: () => void;
  onSave: (config: TaxConfigFormInput) => void;
}
