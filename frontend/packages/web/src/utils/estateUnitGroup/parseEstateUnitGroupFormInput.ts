import { EstateUnitGroupInput } from '@realgimm5/frontend-common/gql/types';

import { EstateUnitGroupFormInput } from '../../interfaces/FormInputs/EstateUnitGroup';

export const parseEstateUnitGroupFormInputToEstateUnitGroupInput = (
  estateUnitGroup: EstateUnitGroupFormInput,
): EstateUnitGroupInput => ({
  estateUnitIds: estateUnitGroup.estateUnits.map(({ id }) => id),
  internalCode: estateUnitGroup.internalCode,
  managementSubjectId: estateUnitGroup.managementSubject!.id,
  name: estateUnitGroup.name,
});
