import { FacilityCatalogueTypeFragment } from '../../../../../gql/RealGimm.Web.CatalogueType.fragment';

export interface CatalogueTypesDialogProps {
  catalogueTypes: FacilityCatalogueTypeFragment[];
  onClose: () => void;
  onSave: (catalogueTypes: FacilityCatalogueTypeFragment[]) => void;
}
