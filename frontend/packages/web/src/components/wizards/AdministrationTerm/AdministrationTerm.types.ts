import { AdministrationTermFragment } from '../../../gql/RealGimm.Web.AdministrationTerm.fragment';
import { AdministrationFormInput } from '../../../interfaces/FormInputs/Administration';
import { AdministrationTermFormInput } from '../../../interfaces/FormInputs/AdministrationTerm';

export interface AdministrationTermCreateDialogProps {
  administration?: AdministrationFormInput;
  existingAdministrationTerms: AdministrationTermFragment[];
  onClose: () => void;
  onSave: (administrationTerm: AdministrationTermFormInput) => void;
}
