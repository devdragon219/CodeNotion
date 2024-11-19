import { UtilityServiceFragment } from '../../../../gql/RealGimm.Web.UtilityService.fragment';

export interface UtilityServiceEstateUnitsDialogProps {
  estateUnits: UtilityServiceFragment['estateUnits'];
  onClose: () => void;
}
