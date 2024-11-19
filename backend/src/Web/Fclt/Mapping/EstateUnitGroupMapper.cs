using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Fclt.EstateUnitGroupAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Fclt.Mapping;

public class EstateUnitGroupMapper : IMapper<EstateUnitGroupInput, EstateUnitGroup>
{
  private readonly IReadRepository<Subject> _subjectRepository;
  private readonly IReadRepository<EstateUnit> _estateUnitRepository;

  public EstateUnitGroupMapper(IReadRepository<Subject> subjectRepository, IReadRepository<EstateUnit> estateUnitRepository)
  {
    _subjectRepository = subjectRepository;
    _estateUnitRepository = estateUnitRepository;
  }

  public async Task<EstateUnitGroup?> MapAsync(
    EstateUnitGroupInput? from,
    EstateUnitGroup? into = null,
    CancellationToken cancellationToken = default)
  {
    if (from is null)
    {
      return null;
    }

    var estateUnitGroup = into ?? new EstateUnitGroup();
    estateUnitGroup.SetData(from.Name, from.InternalCode, from.ManagementSubjectId);
    estateUnitGroup.SetEstateUnitIds(from.EstateUnitIds);

    if (!await CheckManagementSubjectExistsAsync(from.ManagementSubjectId, cancellationToken))
    {
      throw new MappingException(ErrorCode.ManagementSubjectNotFound.ToValidationError());
    }

    if (!await CheckAllEstateUnitsExistsAsync(from.EstateUnitIds, cancellationToken))
    {
      throw new MappingException(ErrorCode.EstateUnitNotFound.ToValidationError());
    }
    
    return estateUnitGroup;
  }

  private async Task<bool> CheckManagementSubjectExistsAsync(int managementSubjectId, CancellationToken cancellationToken)
    => await _subjectRepository
        .AsQueryable(new GetByIdSpec<Subject>(managementSubjectId), new EntityNonDeletedSpec<Subject>())
        .OfType<ManagementSubject>()
        .AnyAsync(cancellationToken);

  private async Task<bool> CheckAllEstateUnitsExistsAsync(IEnumerable<int> estateUnitIds, CancellationToken cancellationToken)
  {
    var estateUnitsCount = await _estateUnitRepository
      .AsQueryable(new GetByIdsSpec<EstateUnit>(estateUnitIds), new EntityNonDeletedSpec<EstateUnit>())
      .CountAsync(cancellationToken);

    return (estateUnitsCount == estateUnitIds.Count());
  }
}
