import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control, FieldErrors, UseFormSetValue, UseFormTrigger } from 'react-hook-form';

import { OrgUnitFormInput } from '../../../../interfaces/FormInputs/OrgUnit';

export interface OrgUnitGeneralDataProps {
  control: Control<OrgUnitFormInput>;
  errors: FieldErrors<OrgUnitFormInput>;
  mode: FormMode;
  readonly?: boolean;
  setValue: UseFormSetValue<OrgUnitFormInput>;
  trigger: UseFormTrigger<OrgUnitFormInput>;
}
