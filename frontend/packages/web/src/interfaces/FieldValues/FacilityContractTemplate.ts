import { FacilityCatalogueTypeFragment } from '../../gql/RealGimm.Web.CatalogueType.fragment';
import { PenaltyDetailFragment } from '../../gql/RealGimm.Web.Penalty.fragment';
import { SlaDetailFragment } from '../../gql/RealGimm.Web.SLA.fragment';

export interface FacilityContractTemplateFieldValue {
  catalogueTypes: FacilityCatalogueTypeFragment[];
  description: string;
  id: number;
  penalties: PenaltyDetailFragment[];
  slas: SlaDetailFragment[];
}
