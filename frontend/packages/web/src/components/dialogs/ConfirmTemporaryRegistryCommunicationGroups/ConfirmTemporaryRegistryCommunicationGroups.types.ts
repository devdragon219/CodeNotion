import { RegistryCommunicationGroupFragment } from '../../../gql/RealGimm.Web.RegistryCommunicationGroup.fragment';
import { ConfirmTemporaryRegistryCommunicationGroupFormInput } from '../../../interfaces/FormInputs/ConfirmTemporaryRegistryCommunicationGroup';

export interface ConfirmTemporaryRegistryCommunicationGroupsDialogProps {
  registryCommunicationGroups?: RegistryCommunicationGroupFragment[];
  onClose: () => void;
  onSave: (
    inputs: ConfirmTemporaryRegistryCommunicationGroupFormInput[],
    registryCommunicationGroups?: RegistryCommunicationGroupFragment[],
  ) => void;
}
