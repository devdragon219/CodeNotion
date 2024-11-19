import { EstateUnitGroupFragment } from '../../../../gql/RealGimm.Web.EstateUnitGroup.fragment';

export interface EstateUnitGroupViewEstateUnitsDialogProps {
  estateUnitGroup: EstateUnitGroupFragment;
  onClose: () => void;
}
