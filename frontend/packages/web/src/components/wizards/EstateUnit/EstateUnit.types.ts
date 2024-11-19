import { EstateFragment } from '../../../gql/RealGimm.Web.Estate.fragment';
import { EstateUnitFormInput } from '../../../interfaces/FormInputs/EstateUnit';

export interface EstateUnitCreateDialogProps {
  estate?: EstateFragment;
  onClose: () => void;
  onSave: (estateUnit: EstateUnitFormInput) => void;
}
