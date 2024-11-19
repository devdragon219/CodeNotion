import { isOfType } from '@realgimm5/frontend-common/utils';

import { EstateFragment } from '../../gql/RealGimm.Web.Estate.fragment';

export const isEstateFragment = (row: unknown): row is EstateFragment => isOfType<EstateFragment>(row, ['type']);
