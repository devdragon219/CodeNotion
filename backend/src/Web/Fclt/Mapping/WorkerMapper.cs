using RealGimm.Core;
using RealGimm.Core.Fclt.CraftAggregate;
using RealGimm.Core.Fclt.QualificationLevelAggregate;
using RealGimm.Core.Fclt.WorkTeamAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Fclt.Mapping;

public class WorkerMapper : IMapper<WorkerInput, Worker>
{
  private readonly IReadRepository<Craft> _craftRepository;
  private readonly IReadRepository<QualificationLevel> _qualificaionLevelRepository;

  public WorkerMapper(IReadRepository<Craft> craftRepository, IReadRepository<QualificationLevel> qualificaionLevelRepository)
  {
    _craftRepository = craftRepository;
    _qualificaionLevelRepository = qualificaionLevelRepository;
  }

  public async Task<Worker?> MapAsync(
    WorkerInput? from,
    Worker? into = null,
    CancellationToken cancellationToken = default)
  {
    if (from is null)
    {
      return null;
    }

    var worker = into ?? new Worker() { Id = from.Id.GetValueOrDefault() };
    worker.SetFirstName(from.FirstName);
    worker.SetLastName(from.LastName);
    worker.SetSince(from.Since);
    worker.SetUntil(from.Until);

    var craft = await _craftRepository.SingleOrDefaultAsync(new GetByIdSpec<Craft>(from.CraftId), cancellationToken)
      ?? throw new MappingException(ErrorCode.CraftNotFound.ToValidationError());

    worker.SetCraft(craft);

    var qualificationLevel = await _qualificaionLevelRepository
      .SingleOrDefaultAsync(new GetByIdSpec<QualificationLevel>(from.QualificationLevelId), cancellationToken)
      ?? throw new MappingException(ErrorCode.QualificationLevelNotFound.ToValidationError());

    worker.SetQualificationLevel(qualificationLevel);
    
    return worker;
  }
}
