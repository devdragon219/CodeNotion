import { isOfType } from '@realgimm5/frontend-common/utils';

import { AsstAddressFragment } from '../../gql/RealGimm.Web.AsstAddress.fragment';

export const isAsstAddressFragment = (row: unknown): row is AsstAddressFragment =>
  isOfType<AsstAddressFragment>(row, ['id']);
