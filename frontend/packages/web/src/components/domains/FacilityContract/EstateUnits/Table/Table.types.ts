import { EstateUnitFragment } from '../../../../../gql/RealGimm.Web.EstateUnit.fragment';

export interface FacilityContractEstateUnitsTableProps {
  estateUnits: EstateUnitFragment[];
  onDelete?: (estateUnits: EstateUnitFragment[]) => void;
}
