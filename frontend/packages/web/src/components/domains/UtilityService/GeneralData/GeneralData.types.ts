import { FormMode } from '@realgimm5/frontend-common/enums';
import { ParseKeys } from 'i18next';
import { Control, FieldErrors } from 'react-hook-form';

import { UtilityServiceFormInput } from '../../../../interfaces/FormInputs/UtilityService';

export interface UtilityServiceGeneralDataProps {
  control: Control<UtilityServiceFormInput>;
  disabled?: boolean;
  errors: FieldErrors<UtilityServiceFormInput>;
  mode: FormMode;
  readonly?: boolean;
  sectionTitle?: ParseKeys;
}
