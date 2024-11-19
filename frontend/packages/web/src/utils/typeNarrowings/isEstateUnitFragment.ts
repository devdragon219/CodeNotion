import { isOfType } from '@realgimm5/frontend-common/utils';

import { EstateUnitFragment } from '../../gql/RealGimm.Web.EstateUnit.fragment';

export const isEstateUnitFragment = (row: unknown): row is EstateUnitFragment =>
  isOfType<EstateUnitFragment>(row, ['type']);
