import { Control, FieldErrors } from 'react-hook-form';

import { ConfirmTemporaryRegistryCommunicationGroupFieldValues } from '../../../../interfaces/FormInputs/ConfirmTemporaryRegistryCommunicationGroup';

export interface InputFieldProps {
  control: Control<ConfirmTemporaryRegistryCommunicationGroupFieldValues>;
  errors: FieldErrors<ConfirmTemporaryRegistryCommunicationGroupFieldValues>;
  index: number;
}
