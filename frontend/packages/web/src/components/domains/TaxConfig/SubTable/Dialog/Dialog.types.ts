import { TableFragment } from '../../../../../gql/RealGimm.Web.Table.fragment';
import { TaxConfigValueFormInput } from '../../../../../interfaces/FormInputs/TaxConfig';

export interface TaxConfigSubTableDialogInput {
  index: number;
  value: TaxConfigValueFormInput;
}

export interface TaxConfigSubTableDialogProps {
  calculator: string;
  input?: TaxConfigSubTableDialogInput;
  subTable: TableFragment;
  onClose: () => void;
  onSave: (value: TaxConfigValueFormInput[] | TaxConfigSubTableDialogInput) => void;
}
