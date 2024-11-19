import { OccupantType } from '@realgimm5/frontend-common/gql/types';

import { OrgUnitFieldValue } from '../FieldValues/OrgUnit';
import { SubjectFieldValue } from '../FieldValues/Subject';
import { UsageTypeFieldValue } from '../FieldValues/UsageType';

export interface EstateSubUnitFormInput {
  estateSubUnitId: number | null;
  estateUnitId: number;
  internalCode: string;
  notes: string;
  occupancyPercent: number | null;
  occupant: SubjectFieldValue | null;
  occupantType: OccupantType | null;
  orgUnit: OrgUnitFieldValue | null;
  since: Date | null;
  surfaceSqM: number | null;
  until: Date | null;
  usageType: UsageTypeFieldValue | null;
}
