using RealGimm.Core.Anag.OrgUnitAggregate;

namespace RealGimm.Core.Anag.Interfaces;
public interface IOrgUnitService
{
  Task<List<OrgUnitTreeNode>> ListOrgUnitTreeAsync(OrgUnitType orgUnitType, CancellationToken cancellationToken = default);
  Task<IQueryable<OrgUnit>> ListOrgUnitByManagementSubjects(int[] managementSubjectIds, int? excludeChildrenOfId, CancellationToken cancellationToken);
}
