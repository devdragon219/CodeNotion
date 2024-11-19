using System.Linq.Expressions;
using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Anag.Interfaces;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Anag.SubjectAggregate.Specifications;
using RealGimm.Core.Anag.OrgUnitAggregate;
using RealGimm.Core.Anag.OrgUnitAggregate.Specifications;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Core.Shared.Specifications;

namespace RealGimm.Core.Anag.Services;

public class OrgUnitService : IOrgUnitService
{
  private readonly IRepository<Subject> _subjectRepository;
  private readonly IRepository<OrgUnit> _orgUnitRepository;

  public OrgUnitService(IRepository<Subject> subjectRepository,
    IRepository<OrgUnit> orgUnitRepository)
  {
    _subjectRepository = subjectRepository;
    _orgUnitRepository = orgUnitRepository;
  }

  public async Task<IQueryable<OrgUnit>> ListOrgUnitByManagementSubjects(int[] managementSubjectIds, int? excludeChildrenOfId, CancellationToken cancellationToken)
  {
    var parentIds = await _subjectRepository
      .AsQueryable(
        new EntityNonDeletedSpec<Subject>(),
        new SubjectIncludeAllSpec(),
        new SubjectsInCompanyGroupIdSpec(managementSubjectIds))
      .Select(s => s.Id)
      .ToArrayAsync(cancellationToken);

    if (excludeChildrenOfId is null)
    {
      return _orgUnitRepository.AsQueryable(new OrgUnitIncludeAllForListSpec(), new EntityNonDeletedSpec<OrgUnit>(), new OrgUnitInParentGroupSpec(parentIds));
    }

    var orgUnitTree = (await _orgUnitRepository
      .AsQueryable()
      .Where(ou => ou.ParentOrgUnitId.HasValue)
      .Select(ou => new { ou.Id, Parent = ou.ParentOrgUnitId!.Value })
      .ToListAsync(cancellationToken))
      .GroupBy(ou => ou.Parent)
      .ToDictionary(grp => grp.Key, grp => grp.Select(ou => ou.Id).ToArray());

    var ouToExclude = GetAllChildrenOf(excludeChildrenOfId.Value, orgUnitTree);

    return _orgUnitRepository.AsQueryable(
      new OrgUnitIncludeAllForListSpec(),
      new EntityNonDeletedSpec<OrgUnit>(),
      new OrgUnitInParentGroupSpec(parentIds),
      new ExcludeByIdsSpec<OrgUnit>(ouToExclude));
  }

  //Includes the parent ID
  private static int[] GetAllChildrenOf(int parent, Dictionary<int, int[]> tree)
  {
    return new[] { parent }
      .Concat(tree.ContainsKey(parent)
        ? tree[parent].SelectMany(child => GetAllChildrenOf(child, tree))
        : Array.Empty<int>())
      .ToArray();
  }

  public async Task<List<OrgUnitTreeNode>> ListOrgUnitTreeAsync(
    OrgUnitType orgUnitType,
    CancellationToken cancellationToken = default)
  {
    //Selects all nondeleted, type-corrected orgUnits that are roots
    static bool OrgUnitFilter(OrgUnit ou, OrgUnitType type) =>
      !ou.ParentOrgUnitId.HasValue &&
      ou.OrgUnitType == type &&
      !ou.DeletionDate.HasValue;

    var managementSubjects = await _subjectRepository
      .AsQueryable(new OrgUnitTreeNodeSubjectSpec())
      .Select(subject => new
      {
        subject.Id,
        subject.Name,
        RelationMains = subject.RelationMains.Select(relation => new
        {
          relation.RelationType,
          Subordinate = new
          {
            relation.Subordinate.Id,
            relation.Subordinate.Name,
            relation.Subordinate.DeletionDate,
            relation.Subordinate.PersonType,
            relation.Subordinate.OrgUnits,
          }
        }),
        subject.OrgUnits
      })
      .ToListAsync(cancellationToken);

    var orgUnitTree = managementSubjects
      .Select(ms => new OrgUnitTreeNode(
      Id: ms.Id,
      Name: ms.Name,
      IsSubject: true,
      Children:
        ms.RelationMains.Where(rm =>
        rm.RelationType == SubjectRelationType.CompanyGroup &&
        !rm.Subordinate.DeletionDate.HasValue &&
        rm.Subordinate.PersonType != PersonType.ManagementSubject &&
        rm.Subordinate.OrgUnits.Any(orgUnit => OrgUnitFilter(orgUnit, orgUnitType)))
        .Select(rm => new OrgUnitTreeNode(
            Id: rm.Subordinate.Id,
            Name: rm.Subordinate.Name,
            IsSubject: true,
            Children: rm.Subordinate.OrgUnits
            .Where(orgUnit => OrgUnitFilter(orgUnit, orgUnitType))
            .Select(MapOrgUnit)
          ))
        .Concat(ms.OrgUnits.Where(orgUnit => OrgUnitFilter(orgUnit, orgUnitType)).Select(MapOrgUnit))
    )).Where(ms => ms.Children != null && ms.Children.Any());

    return orgUnitTree.ToList();
  }

  private OrgUnitTreeNode MapOrgUnit(OrgUnit orgUnit)
  {
    return new OrgUnitTreeNode(
      Id: orgUnit.Id,
      Name: orgUnit.Name,
      IsSubject: false,
      Children: orgUnit.Children?.Where(e => !e.DeletionDate.HasValue).Select(MapOrgUnit)
    );
  }
}
