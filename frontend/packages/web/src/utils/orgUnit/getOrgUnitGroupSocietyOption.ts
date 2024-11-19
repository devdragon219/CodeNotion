import { OrgUnitFragment } from '../../gql/RealGimm.Web.OrgUnit.fragment';

export const getOrgUnitGroupSocietyOption = (orgUnit?: OrgUnitFragment): { id: number; name: string } | null => {
  if (!orgUnit) return null;

  if (
    orgUnit.parentSubject.__typename !== 'PhysicalSubject' &&
    !!orgUnit.parentSubject.companyGroupParent &&
    orgUnit.parentSubject.companyGroupParent.main.id !== orgUnit.parentSubject.id
  ) {
    return {
      id: orgUnit.parentSubject.id,
      name: orgUnit.parentSubject.name,
    };
  }

  return null;
};
