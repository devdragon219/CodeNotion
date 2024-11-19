import { OrgUnitFragment } from '../../gql/RealGimm.Web.OrgUnit.fragment';
import { UserOrgUnitFormInput } from '../../interfaces/FormInputs/User';
import { getOrgUnitGroupSocietyOption } from '../orgUnit/getOrgUnitGroupSocietyOption';
import { getOrgUnitManagementSubjectOption } from '../orgUnit/getOrgUnitManagementSubjectOption';

export const getUserOrgUnitsInput = (orgUnits?: OrgUnitFragment[] | null): UserOrgUnitFormInput[] =>
  orgUnits?.map((unit) => ({
    orgUnitId: unit.id,
    internalCode: unit.internalCode,
    name: unit.name ?? '',
    orgUnitType: unit.orgUnitType,
    managementSubjectName: getOrgUnitManagementSubjectOption(unit)?.name ?? '',
    groupSocietyName: getOrgUnitGroupSocietyOption(unit)?.name ?? '',
    parentOrgUnitName: unit.parentOrgUnit?.name ?? '',
  })) ?? [];
