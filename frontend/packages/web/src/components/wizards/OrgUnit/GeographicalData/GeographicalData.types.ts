import { OrgUnitFormInput } from '../../../../interfaces/FormInputs/OrgUnit';

export interface OrgUnitGeographicalDataStepProps {
  orgUnit: OrgUnitFormInput;
  onBack: () => void;
  onChange: (orgUnit: OrgUnitFormInput) => void;
  onError: () => void;
  onNext: () => void;
}
