import { TableFragment } from '../../../../gql/RealGimm.Web.Table.fragment';
import { TaxConfigFormInput } from '../../../../interfaces/FormInputs/TaxConfig';

export interface TaxConfigSubTableStepProps {
  calculator: string;
  config: TaxConfigFormInput;
  subTable: TableFragment;
  onBack: () => void;
  onChange: (config: TaxConfigFormInput) => void;
  onError: (error?: boolean | string) => void;
  onNext: () => void;
}
