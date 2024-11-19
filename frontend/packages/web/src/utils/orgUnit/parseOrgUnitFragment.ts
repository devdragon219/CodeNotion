import { getContactsFormInput, parseStringToDate } from '@realgimm5/frontend-common/utils';

import { OrgUnitFragment } from '../../gql/RealGimm.Web.OrgUnit.fragment';
import { OrgUnitFormInput } from '../../interfaces/FormInputs/OrgUnit';
import { getOrgUnitGroupSocietyOption } from './getOrgUnitGroupSocietyOption';
import { getOrgUnitManagementSubjectOption } from './getOrgUnitManagementSubjectOption';
import { getOrgUnitParentOrgUnitOption } from './getOrgUnitParentOrgUnitOption';

export const parseOrgUnitToOrgUnitFormInput = (orgUnit: OrgUnitFragment): OrgUnitFormInput => ({
  cities: orgUnit.cities,
  closureDate: parseStringToDate(orgUnit.closureDate),
  contacts: getContactsFormInput(orgUnit.contacts),
  entryDescription: orgUnit.name ?? '',
  entryStatus: orgUnit.entryStatus,
  externalCode: orgUnit.externalCode ?? '',
  groupSociety: getOrgUnitGroupSocietyOption(orgUnit),
  internalCode: orgUnit.internalCode,
  managementSubject: getOrgUnitManagementSubjectOption(orgUnit),
  orgUnitId: orgUnit.id,
  orgUnitType: orgUnit.orgUnitType,
  parentOrgUnit: getOrgUnitParentOrgUnitOption(orgUnit),
});
