import { EstateUnitFragment } from '../../../../gql/RealGimm.Web.EstateUnit.fragment';
import { EstateUnitGroupFormInput } from '../../../../interfaces/FormInputs/EstateUnitGroup';

export interface EstateUnitGroupEstateUnitsDialogProps {
  estateUnitGroup: EstateUnitGroupFormInput;
  onClose: () => void;
  onSave: (estateUnits: EstateUnitFragment[]) => void;
}
