import { FacilityCatalogueTypeFragment } from '../../gql/RealGimm.Web.CatalogueType.fragment';

export interface CatalogueItemFieldValue {
  catalogueType: FacilityCatalogueTypeFragment;
  id: number;
  internalCode: string;
}
