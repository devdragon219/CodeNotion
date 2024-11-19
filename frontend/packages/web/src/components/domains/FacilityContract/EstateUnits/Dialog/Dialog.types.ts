import { EstateUnitFragment } from '../../../../../gql/RealGimm.Web.EstateUnit.fragment';
import { EstateUnitGroupFieldValue } from '../../../../../interfaces/FieldValues/EstateUnitGroup';

export interface EstateUnitsDialogProps {
  estateUnits: EstateUnitFragment[];
  estateUnitGroup: EstateUnitGroupFieldValue | null;
  onClose: () => void;
  onSave: (estateUnits: EstateUnitFragment[]) => void;
}
