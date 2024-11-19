import { FcltContractTypeInput } from '@realgimm5/frontend-common/gql/types';

import { FacilityContractTypeFormInput } from '../../interfaces/FormInputs/FacilityContractType';

export const parseFacilityContractTypeFormInputToFacilityContractTypeInput = (
  facilityContractType: FacilityContractTypeFormInput,
): FcltContractTypeInput => ({
  internalCode: facilityContractType.internalCode,
  name: facilityContractType.name,
  ordering: facilityContractType.ordering,
});
