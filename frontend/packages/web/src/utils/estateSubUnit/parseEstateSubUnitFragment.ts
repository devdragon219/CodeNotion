import { parseStringToDate } from '@realgimm5/frontend-common/utils';

import { EstateSubUnitFragment } from '../../gql/RealGimm.Web.EstateSubUnit.fragment';
import { EstateSubUnitFormInput } from '../../interfaces/FormInputs/EstateSubUnit';

export const parseEstateSubUnitToEstateSubUnitFormInput = (
  estateSubUnit: EstateSubUnitFragment,
): EstateSubUnitFormInput => ({
  estateSubUnitId: estateSubUnit.id,
  internalCode: estateSubUnit.internalCode,
  estateUnitId: estateSubUnit.estateUnit.id,
  occupancyPercent: estateSubUnit.occupancyPercent ?? null,
  occupant: estateSubUnit.occupantSubject
    ? {
        name: estateSubUnit.occupantSubject.name,
        id: estateSubUnit.occupantSubject.id,
      }
    : null,
  surfaceSqM: estateSubUnit.surfaceSqM ?? null,
  orgUnit: estateSubUnit.orgUnit
    ? {
        name: estateSubUnit.orgUnit.name ?? '',
        id: estateSubUnit.orgUnit.id,
      }
    : null,
  occupantType: estateSubUnit.occupantType ?? null,
  usageType: estateSubUnit.usageType ?? null,
  since: parseStringToDate(estateSubUnit.since),
  until: parseStringToDate(estateSubUnit.until),
  notes: estateSubUnit.notes ?? '',
});
