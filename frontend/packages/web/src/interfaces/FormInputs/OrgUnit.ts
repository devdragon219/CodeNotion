import { EntryStatus, OrgUnitType } from '@realgimm5/frontend-common/gql/types';
import { ContactsFormInput } from '@realgimm5/frontend-common/interfaces';

import { CityFragment } from '../../gql/RealGimm.Web.City.fragment';
import { SubjectFieldValue } from '../FieldValues/Subject';

export interface OrgUnitFormInput {
  cities: CityFragment[];
  closureDate: Date | null;
  contacts: ContactsFormInput;
  entryDescription: string;
  entryStatus: EntryStatus | null;
  externalCode: string;
  groupSociety: SubjectFieldValue | null;
  internalCode: string;
  managementSubject: SubjectFieldValue | null;
  orgUnitId: number | null;
  orgUnitType: OrgUnitType;
  parentOrgUnit: { id: number; name: string } | null;
}
