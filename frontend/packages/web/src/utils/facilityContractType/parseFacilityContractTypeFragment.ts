import { FacilityContractTypeFragment } from '../../gql/RealGimm.Web.FacilityContractType.fragment';
import { FacilityContractTypeFormInput } from '../../interfaces/FormInputs/FacilityContractType';

export const parseFacilityContractTypeToFacilityContractTypeFormInput = (
  facilityContractType: FacilityContractTypeFragment,
): FacilityContractTypeFormInput => ({
  facilityContractTypeId: facilityContractType.id,
  internalCode: facilityContractType.internalCode,
  name: facilityContractType.name,
  ordering: facilityContractType.ordering,
});
