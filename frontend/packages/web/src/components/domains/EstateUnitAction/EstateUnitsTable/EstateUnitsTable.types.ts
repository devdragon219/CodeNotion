import { TableState } from '@tanstack/react-table';
import { ParseKeys } from 'i18next';

import { EstateUnitFragment } from '../../../../gql/RealGimm.Web.EstateUnit.fragment';

export interface EstateUnitActionEstateUnitsTableProps {
  sectionTitle: ParseKeys;
  onChange: (estateUnit: EstateUnitFragment | null) => void;
  onChangeInitialState?: (initialState: Partial<TableState>) => void;
}
