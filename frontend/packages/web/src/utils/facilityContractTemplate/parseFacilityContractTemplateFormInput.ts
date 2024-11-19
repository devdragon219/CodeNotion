import { ContractTemplateInput } from '@realgimm5/frontend-common/gql/types';

import { FacilityContractTemplateFormInput } from '../../interfaces/FormInputs/FacilityContractTemplate';

export const parseFacilityContractTemplateFormInputToFacilityContractTemplateInput = (
  facilityContractTemplate: FacilityContractTemplateFormInput,
): ContractTemplateInput => ({
  catalogueTypeIds: facilityContractTemplate.catalogueTypes.map(({ id }) => id),
  contractTypeId: facilityContractTemplate.facilityContractType!.id,
  description: facilityContractTemplate.description,
  internalCode: facilityContractTemplate.internalCode,
  penaltyIds: facilityContractTemplate.penalties.map(({ penaltyId }) => penaltyId!),
  slaIds: facilityContractTemplate.slas.map(({ slaId }) => slaId!),
});
