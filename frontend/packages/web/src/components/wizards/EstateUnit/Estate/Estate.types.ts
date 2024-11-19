import { EstateFragment } from '../../../../gql/RealGimm.Web.Estate.fragment';
import { EstateUnitFormInput } from '../../../../interfaces/FormInputs/EstateUnit';

export interface EstateUnitEstateStepProps {
  estate?: EstateFragment;
  estateUnit: EstateUnitFormInput;
  onChange: (estateUnit: EstateUnitFormInput) => void;
  onError: (message?: string) => void;
  onNext: () => void;
}
