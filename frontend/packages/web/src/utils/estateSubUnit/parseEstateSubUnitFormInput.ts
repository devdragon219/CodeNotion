import { EstateSubUnitInput } from '@realgimm5/frontend-common/gql/types';
import { getStringOrNull, parseDateToString } from '@realgimm5/frontend-common/utils';

import { EstateSubUnitFormInput } from '../../interfaces/FormInputs/EstateSubUnit';

export const parseEstateSubUnitFormInputToEstateSubUnitInput = (
  estateSubUnit: EstateSubUnitFormInput,
): EstateSubUnitInput => ({
  estateUnitId: estateSubUnit.estateUnitId,
  id: estateSubUnit.estateSubUnitId,
  internalCode: estateSubUnit.internalCode,
  note: getStringOrNull(estateSubUnit.notes),
  occupancyPercent: estateSubUnit.occupancyPercent,
  occupantId: estateSubUnit.occupant?.id,
  occupantType: estateSubUnit.occupantType,
  orgUnitId: estateSubUnit.orgUnit?.id,
  since: parseDateToString(estateSubUnit.since),
  surfaceSqM: estateSubUnit.surfaceSqM,
  until: parseDateToString(estateSubUnit.until),
  usageTypeId: estateSubUnit.usageType?.id,
});
