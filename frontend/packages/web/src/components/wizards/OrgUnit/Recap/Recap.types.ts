import { OrgUnitFormInput } from '../../../../interfaces/FormInputs/OrgUnit';

export interface OrgUnitRecapStepProps {
  orgUnit: OrgUnitFormInput;
  onBack: () => void;
  onEdit: (step: number) => void;
  onSave: (orgUnit: OrgUnitFormInput) => void;
}
