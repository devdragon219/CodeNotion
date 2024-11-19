import { RegistryCommunicationGroupIdFragment } from '../../../../gql/RealGimm.Web.RegistryCommunicationGroupId.fragment';

export interface RegistryCommunicationGroupItemsProps {
  groupId: RegistryCommunicationGroupIdFragment;
  isConfirmed: boolean;
  readonly?: boolean;
}
