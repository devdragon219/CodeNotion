import { Control } from 'react-hook-form';

import { AdministrationTermFormInput } from '../../../../interfaces/FormInputs/AdministrationTerm';

export interface AdministrationTermPaymentsProps {
  control: Control<AdministrationTermFormInput>;
  readonly?: boolean;
}
