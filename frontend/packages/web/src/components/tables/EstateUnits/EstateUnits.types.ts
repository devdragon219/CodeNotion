import { EstateUnitStatus } from '@realgimm5/frontend-common/gql/types';
import { ReactNode } from 'react';

import { EstateFragment } from '../../../gql/RealGimm.Web.Estate.fragment';

export interface EstateUnitsTableProps {
  customActions?: ReactNode;
  estate?: EstateFragment;
  estateUnitIds?: number[];
  readonly?: boolean;
  status?: EstateUnitStatus;
}
