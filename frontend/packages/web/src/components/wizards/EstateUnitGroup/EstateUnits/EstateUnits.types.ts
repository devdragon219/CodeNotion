import { EstateUnitGroupFormInput } from '../../../../interfaces/FormInputs/EstateUnitGroup';

export interface EstateUnitGroupEstateUnitsStepProps {
  estateUnitGroup: EstateUnitGroupFormInput;
  onBack: () => void;
  onChange: (estateUnitGroup: EstateUnitGroupFormInput) => void;
  onError: (message?: string) => void;
  onSave: (estateUnitGroup: EstateUnitGroupFormInput) => void;
}
