import { OrgUnitFormInput } from '../../../../interfaces/FormInputs/OrgUnit';

export interface OrgUnitContactsStepProps {
  orgUnit: OrgUnitFormInput;
  onBack: () => void;
  onChange: (orgUnit: OrgUnitFormInput) => void;
  onError: () => void;
  onNext: () => void;
}
