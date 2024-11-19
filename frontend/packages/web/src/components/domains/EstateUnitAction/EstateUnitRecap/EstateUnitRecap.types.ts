import { EstateUnitFragment } from '../../../../gql/RealGimm.Web.EstateUnit.fragment';

export interface EstateUnitActionEstateUnitRecapProps {
  estateUnitId: number;
  onChange: (estateUnit: EstateUnitFragment) => void;
}
