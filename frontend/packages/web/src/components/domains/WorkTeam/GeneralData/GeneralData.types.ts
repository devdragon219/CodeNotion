import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form';

import { WorkTeamFormInput } from '../../../../interfaces/FormInputs/WorkTeam';

export interface WorkTeamGeneralDataProps {
  control: Control<WorkTeamFormInput>;
  errors: FieldErrors<WorkTeamFormInput>;
  readonly?: boolean;
  setValue: UseFormSetValue<WorkTeamFormInput>;
}
