import { FacilityCatalogueTypeFragment } from '../../../../../gql/RealGimm.Web.CatalogueType.fragment';

export interface FacilityContractCatalogueTypesTableProps {
  catalogueTypes: FacilityCatalogueTypeFragment[];
  useRowExpandCollapse?: boolean;
}
