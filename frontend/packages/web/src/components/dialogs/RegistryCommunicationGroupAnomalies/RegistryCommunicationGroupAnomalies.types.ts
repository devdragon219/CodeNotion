import { RegistryCommunicationGroupIdFragment } from '../../../gql/RealGimm.Web.RegistryCommunicationGroupId.fragment';

export interface RegistryCommunicationGroupAnomaliesDialogProps {
  groupId: RegistryCommunicationGroupIdFragment;
  onClose: () => void;
}
