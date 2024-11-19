import { OrgUnitFragment } from '../../gql/RealGimm.Web.OrgUnit.fragment';

export const getOrgUnitParentOrgUnitOption = (orgUnit?: OrgUnitFragment): { id: number; name: string } | null => {
  if (!orgUnit) return null;

  return orgUnit.parentOrgUnit ? { id: orgUnit.parentOrgUnit.id, name: orgUnit.parentOrgUnit.name ?? '' } : null;
};
