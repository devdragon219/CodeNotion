import { EstateUnitFragment } from '../../gql/RealGimm.Web.EstateUnit.fragment';

export interface EstateUnitGroupFieldValue {
  id: number;
  estateUnits: EstateUnitFragment[];
  name: string;
}
