import { TableFragment } from '../../../../gql/RealGimm.Web.Table.fragment';
import { TaxConfigFormInput } from '../../../../interfaces/FormInputs/TaxConfig';

export interface TaxConfigRecapStepProps {
  calculator: string;
  config: TaxConfigFormInput;
  subTables: TableFragment[];
  onBack: () => void;
  onEdit: (step: number) => void;
  onSave: (config: TaxConfigFormInput) => void;
}
