import { EstateUnitFragment } from '../../../../gql/RealGimm.Web.EstateUnit.fragment';

export interface EstateUnitGroupEstateUnitsTableProps {
  estateUnits: EstateUnitFragment[];
  onRowDelete?: (index: number) => void;
}
