import { FacilityCatalogueTypeFragment } from '../../../../../gql/RealGimm.Web.CatalogueType.fragment';
import { EstateUnitFragment } from '../../../../../gql/RealGimm.Web.EstateUnit.fragment';

export interface CatalogueTypesDialogProps {
  catalogueTypes: FacilityCatalogueTypeFragment[];
  estateUnits: EstateUnitFragment[];
  onClose: () => void;
  onSave: (catalogueTypes: FacilityCatalogueTypeFragment[]) => void;
}
