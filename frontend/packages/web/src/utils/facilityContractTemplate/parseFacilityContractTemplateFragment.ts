import { FacilityContractTemplateDetailFragment } from '../../gql/RealGimm.Web.FacilityContractTemplate.fragment';
import { FacilityContractTemplateFormInput } from '../../interfaces/FormInputs/FacilityContractTemplate';
import { parsePenaltyToPenaltyFormInput } from '../penalty/parsePenaltyFragment';
import { parseSlaToSlaFormInput } from '../sla/parseSLAFragment';

export const parseFacilityContractTemplateToFacilityContractTemplateFormInput = (
  facilityContractTemplate: FacilityContractTemplateDetailFragment,
): FacilityContractTemplateFormInput => ({
  catalogueTypes: facilityContractTemplate.catalogueTypes.map((catalogueType) => ({
    category: catalogueType.category,
    id: catalogueType.id,
    name: catalogueType.name,
    subCategory: catalogueType.subCategory ?? null,
  })),
  description: facilityContractTemplate.description,
  facilityContractTemplateId: facilityContractTemplate.id,
  facilityContractType: facilityContractTemplate.contractType,
  internalCode: facilityContractTemplate.internalCode,
  penalties: facilityContractTemplate.penalties.map(parsePenaltyToPenaltyFormInput),
  slas: facilityContractTemplate.slas.map(parseSlaToSlaFormInput),
});
