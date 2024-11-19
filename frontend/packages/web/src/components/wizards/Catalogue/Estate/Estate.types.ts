import { EstateFragment } from '../../../../gql/RealGimm.Web.Estate.fragment';
import { CatalogueFormInput } from '../../../../interfaces/FormInputs/Catalogue';

export interface CatalogueEstateStepProps {
  catalogue: CatalogueFormInput;
  estate?: EstateFragment;
  onChange: (catalogue: CatalogueFormInput) => void;
  onError: (message?: string) => void;
  onNext: () => void;
}
