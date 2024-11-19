import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';

import { AdministrationTermFormInput } from '../../../../interfaces/FormInputs/AdministrationTerm';

export interface AdministrationTermGeneralDataProps {
  control: Control<AdministrationTermFormInput>;
  errors: FieldErrors<AdministrationTermFormInput>;
  mode: FormMode;
  readonly?: boolean;
  setValue: UseFormSetValue<AdministrationTermFormInput>;
}
