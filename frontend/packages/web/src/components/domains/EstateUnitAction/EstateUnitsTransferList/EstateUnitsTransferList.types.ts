import { EstateUnitFragment } from '../../../../gql/RealGimm.Web.EstateUnit.fragment';

export interface EstateUnitActionEstateUnitsTransferListProps {
  estateUnit?: EstateUnitFragment;
  value: EstateUnitFragment[];
  onChange: (estateUnits: EstateUnitFragment[]) => void;
}
