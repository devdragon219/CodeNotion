import { GeographicalOrgUnitInput, ManagementOrgUnitInput, OrgUnitType } from '@realgimm5/frontend-common/gql/types';
import { getStringOrNull, parseDateToString } from '@realgimm5/frontend-common/utils';

import { OrgUnitFormInput } from '../../interfaces/FormInputs/OrgUnit';
import { getContactsOrEmpty } from '../input/getContactsOrEmpty';

export const parseOrgUnitFormInputToOrgUnitInput = (orgUnit: OrgUnitFormInput) => {
  const parseInputToManagementOrgUnit = (input: OrgUnitFormInput): ManagementOrgUnitInput => ({
    orgUnitId: input.orgUnitId,
    parentSubjectId: Number(input.groupSociety?.id ?? input.managementSubject?.id),
    parentOrgUnitId: input.parentOrgUnit?.id,
    name: getStringOrNull(input.entryDescription),
    internalCode: input.internalCode,
    externalCode: getStringOrNull(input.externalCode),
    entryStatus: input.entryStatus,
    closureDate: parseDateToString(input.closureDate, 'complete'),
    contacts: [...getContactsOrEmpty(input.contacts.emails), ...getContactsOrEmpty(input.contacts.phones)],
  });

  const parseInputToGeographicalOrgUnit = (input: OrgUnitFormInput): GeographicalOrgUnitInput => ({
    orgUnitId: input.orgUnitId,
    parentSubjectId: Number(input.groupSociety?.id ?? input.managementSubject?.id),
    parentOrgUnitId: input.parentOrgUnit?.id,
    name: getStringOrNull(input.entryDescription),
    internalCode: input.internalCode,
    externalCode: getStringOrNull(input.externalCode),
    entryStatus: input.entryStatus,
    closureDate: parseDateToString(input.closureDate, 'complete'),
    contacts: [...getContactsOrEmpty(input.contacts.emails), ...getContactsOrEmpty(input.contacts.phones)],
    geographicalCities: input.cities.map(({ id }) => id),
  });

  switch (orgUnit.orgUnitType) {
    default:
    case OrgUnitType.ManagementHierarchy:
      return parseInputToManagementOrgUnit(orgUnit);
    case OrgUnitType.GeographicalHierarchy:
      return parseInputToGeographicalOrgUnit(orgUnit);
  }
};
