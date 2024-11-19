import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control, FieldErrors } from 'react-hook-form';

import { TableFragment } from '../../../../gql/RealGimm.Web.Table.fragment';
import { TaxConfigFormInput } from '../../../../interfaces/FormInputs/TaxConfig';

export interface TaxConfigSubTableProps {
  calculator: string;
  control: Control<TaxConfigFormInput>;
  errors: FieldErrors<TaxConfigFormInput>;
  mode: FormMode;
  readonly?: boolean;
  subTable: TableFragment;
}
