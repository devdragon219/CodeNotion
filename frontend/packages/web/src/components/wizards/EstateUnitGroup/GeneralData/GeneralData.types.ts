import { EstateUnitGroupFormInput } from '../../../../interfaces/FormInputs/EstateUnitGroup';

export interface EstateUnitGroupGeneralDataStepProps {
  canUseInternalCode: boolean;
  estateUnitGroup: EstateUnitGroupFormInput;
  onChange: (estateUnitGroup: EstateUnitGroupFormInput) => void;
  onError: () => void;
  onNext: () => void;
}
