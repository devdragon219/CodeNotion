using Ardalis.Specification;

namespace RealGimm.Core.Fclt.WorkTeamAggregate.Specifications;

public class WorkTeamIncludeForListSpec : Specification<WorkTeam>
{
  public WorkTeamIncludeForListSpec()
  {
    Query
      .Include(workTeam => workTeam.Workers)
        .ThenInclude(worker => worker.Craft)
      .Include(workTeam => workTeam.Workers)
        .ThenInclude(worker => worker.QualificationLevel);
  }
}
