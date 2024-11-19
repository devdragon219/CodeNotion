import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control, FieldErrors } from 'react-hook-form';

import { GroupFormInput } from '../../../../interfaces/FormInputs/Group';

export interface GroupGeneralDataProps {
  control: Control<GroupFormInput>;
  errors: FieldErrors<GroupFormInput>;
  mode: FormMode;
  readonly?: boolean;
}
