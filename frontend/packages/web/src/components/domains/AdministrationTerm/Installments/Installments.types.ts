import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control, FieldErrors } from 'react-hook-form';

import { AdministrationTermFormInput } from '../../../../interfaces/FormInputs/AdministrationTerm';

export interface AdministrationTermInstallmentsProps {
  control: Control<AdministrationTermFormInput>;
  mode: FormMode;
  errors: FieldErrors<AdministrationTermFormInput>;
  readonly?: boolean;
}
