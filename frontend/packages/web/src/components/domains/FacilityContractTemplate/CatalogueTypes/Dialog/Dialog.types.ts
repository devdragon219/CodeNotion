import { FacilityCatalogueTypeFragment } from '../../../../../gql/RealGimm.Web.CatalogueType.fragment';

export interface FacilityContractTemplateCatalogueTypesDialogProps {
  catalogueTypes: FacilityCatalogueTypeFragment[];
  onClose: () => void;
}
