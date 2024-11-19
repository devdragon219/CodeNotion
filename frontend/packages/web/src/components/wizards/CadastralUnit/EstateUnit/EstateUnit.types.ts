import { EstateUnitFragment } from '../../../../gql/RealGimm.Web.EstateUnit.fragment';
import { CadastralUnitFormInput } from '../../../../interfaces/FormInputs/CadastralUnit';

export interface CadastralUnitEstateUnitStepProps {
  cadastralUnit: CadastralUnitFormInput;
  estateUnit?: EstateUnitFragment;
  onChange: (cadastralUnit: CadastralUnitFormInput) => void;
  onError: (message?: string) => void;
  onNext: () => void;
}
