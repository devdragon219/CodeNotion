import { TableFragment } from '../../../gql/RealGimm.Web.Table.fragment';
import { TaxConfigMainTableRowFragment } from '../../../gql/RealGimm.Web.TaxConfigMainTableRow.fragment';
import { TaxConfigSubTableRowFragment } from '../../../gql/RealGimm.Web.TaxConfigSubTableRow.fragment';
import { TaxConfigValueFormInput } from '../../../interfaces/FormInputs/TaxConfig';

export interface TaxConfigValueDialogProps {
  calculator: string;
  readonly?: boolean;
  row?: TaxConfigMainTableRowFragment | TaxConfigSubTableRowFragment;
  table: TableFragment;
  onClose: () => void;
  onSave: (value: TaxConfigValueFormInput) => void;
}
