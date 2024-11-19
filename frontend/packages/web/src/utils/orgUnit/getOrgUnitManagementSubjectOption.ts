import { OrgUnitFragment } from '../../gql/RealGimm.Web.OrgUnit.fragment';

export const getOrgUnitManagementSubjectOption = (orgUnit?: OrgUnitFragment): { id: number; name: string } | null => {
  if (!orgUnit) return null;

  switch (orgUnit.parentSubject.__typename) {
    case 'ManagementSubject':
    case 'LegalSubject':
      return {
        id: orgUnit.parentSubject.companyGroupParent?.main.id ?? orgUnit.parentSubject.id,
        name: orgUnit.parentSubject.companyGroupParent?.main.name ?? orgUnit.parentSubject.name,
      };
    default:
      return {
        id: orgUnit.parentSubject.id,
        name: orgUnit.parentSubject.name,
      };
  }
};
