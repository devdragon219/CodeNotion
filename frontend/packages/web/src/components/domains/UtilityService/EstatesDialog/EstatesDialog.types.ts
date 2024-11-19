import { UtilityServiceFragment } from '../../../../gql/RealGimm.Web.UtilityService.fragment';

export interface UtilityServiceEstatesDialogProps {
  estates: UtilityServiceFragment['estates'];
  onClose: () => void;
}
