import { ContactInfoType, EntryStatus, OrgUnitType } from '@realgimm5/frontend-common/gql/types';
import { getEmptyContactFormInput } from '@realgimm5/frontend-common/utils';

import { OrgUnitFormInput } from '../../interfaces/FormInputs/OrgUnit';

export const getEmptyOrgUnitFormInput = (orgUnitType: OrgUnitType): OrgUnitFormInput => ({
  cities: [],
  closureDate: null,
  contacts: {
    emails: [
      getEmptyContactFormInput(ContactInfoType.EMail),
      getEmptyContactFormInput(ContactInfoType.RegisteredEmail),
    ],
    phones: [
      getEmptyContactFormInput(ContactInfoType.MobilePhone),
      getEmptyContactFormInput(ContactInfoType.LandlinePhone),
    ],
  },
  entryDescription: '',
  entryStatus: EntryStatus.Working,
  externalCode: '',
  groupSociety: null,
  internalCode: '',
  managementSubject: null,
  orgUnitId: null,
  orgUnitType,
  parentOrgUnit: null,
});
