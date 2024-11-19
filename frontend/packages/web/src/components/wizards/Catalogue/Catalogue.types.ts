import { EstateFragment } from '../../../gql/RealGimm.Web.Estate.fragment';
import { CatalogueFormInput } from '../../../interfaces/FormInputs/Catalogue';

export interface CatalogueCreateDialogProps {
  estate?: EstateFragment;
  onClose: () => void;
  onSave: (catalogue: CatalogueFormInput) => void;
}
