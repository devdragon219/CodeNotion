import { FacilityCatalogueTypeFragment } from '../../gql/RealGimm.Web.CatalogueType.fragment';
import { FacilityContractTypeFieldValue } from '../FieldValues/FacilityContractType';
import { PenaltyFormInput } from './Penalty';
import { SlaFormInput } from './SLA';

export interface FacilityContractTemplateFormInput {
  catalogueTypes: FacilityCatalogueTypeFragment[];
  description: string;
  facilityContractTemplateId: number | null;
  facilityContractType: FacilityContractTypeFieldValue | null;
  internalCode: string;
  penalties: PenaltyFormInput[];
  slas: SlaFormInput[];
}
