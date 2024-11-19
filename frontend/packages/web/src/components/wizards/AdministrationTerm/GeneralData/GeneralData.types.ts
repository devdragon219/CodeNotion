import { AdministrationTermFragment } from '../../../../gql/RealGimm.Web.AdministrationTerm.fragment';
import { AdministrationFormInput } from '../../../../interfaces/FormInputs/Administration';
import { AdministrationTermFormInput } from '../../../../interfaces/FormInputs/AdministrationTerm';

export interface AdministrationTermGeneralDataStepProps {
  administration?: AdministrationFormInput;
  administrationTerm: AdministrationTermFormInput;
  existingAdministrationTerms: AdministrationTermFragment[];
  onChange: (administrationTern: AdministrationTermFormInput) => void;
  onError: () => void;
  onNext: () => void;
}
