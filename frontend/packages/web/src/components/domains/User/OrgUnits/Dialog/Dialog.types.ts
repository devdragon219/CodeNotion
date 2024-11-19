import { SubjectFieldValue } from '../../../../../interfaces/FieldValues/Subject';
import { UserOrgUnitFormInput } from '../../../../../interfaces/FormInputs/User';

export interface UserOrgUnitsDialogProps {
  input: {
    orgUnits: UserOrgUnitFormInput[];
    managementSubjects: SubjectFieldValue[];
  };
  onClose: () => void;
  onSave: (value: UserOrgUnitFormInput[]) => void;
}
