import { EstateUnitFragment } from '../../gql/RealGimm.Web.EstateUnit.fragment';
import { SubjectFieldValue } from '../FieldValues/Subject';

export interface EstateUnitGroupFormInput {
  estateUnitGroupId: number | null;
  estateUnits: EstateUnitFragment[];
  internalCode: string;
  managementSubject: SubjectFieldValue | null;
  name: string;
}
