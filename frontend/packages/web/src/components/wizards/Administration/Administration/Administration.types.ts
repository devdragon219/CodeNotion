import { AdministrationFragment } from '../../../../gql/RealGimm.Web.Administration.fragment';
import { AdministrationsFormInput } from '../../../../interfaces/FormInputs/Administration';

export interface AdministrationAdministrationsStepProps {
  administrations: AdministrationsFormInput;
  existingAdministrations: AdministrationFragment[];
  onChange: (administrations: AdministrationsFormInput) => void;
  onError: (message?: string) => void;
  onNext: () => void;
  onBack: () => void;
}
