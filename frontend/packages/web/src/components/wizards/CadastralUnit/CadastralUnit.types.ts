import { EstateUnitFragment } from '../../../gql/RealGimm.Web.EstateUnit.fragment';
import { CadastralUnitFormInput } from '../../../interfaces/FormInputs/CadastralUnit';

export interface CadastralUnitCreateDialogProps {
  estateUnit?: EstateUnitFragment;
  onClose: () => void;
  onSave: (cadastralUnit: CadastralUnitFormInput) => void;
}
