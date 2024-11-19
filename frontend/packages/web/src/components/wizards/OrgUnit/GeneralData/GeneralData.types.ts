import { OrgUnitFormInput } from '../../../../interfaces/FormInputs/OrgUnit';

export interface OrgUnitGeneralDataStepProps {
  canUseInternalCode: boolean;
  orgUnit: OrgUnitFormInput;
  onChange: (orgUnit: OrgUnitFormInput) => void;
  onError: () => void;
  onNext: () => void;
}
