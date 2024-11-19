import { FormMode } from '@realgimm5/frontend-common/enums';
import { Control, FieldErrors } from 'react-hook-form';

import { ServiceCategoryFormInput } from '../../../../interfaces/FormInputs/ServiceCategory';

export interface ServiceCategoryGeneralDataProps {
  control: Control<ServiceCategoryFormInput>;
  errors: FieldErrors<ServiceCategoryFormInput>;
  mode: FormMode;
  readonly?: boolean;
}
