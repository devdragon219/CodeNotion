using Ardalis.Specification;

namespace RealGimm.Core.Fclt.WorkTeamAggregate.Specifications;

public class WorkTeamIncludeAllSpec : Specification<WorkTeam>
{
  public WorkTeamIncludeAllSpec()
  {
    Query
      .Include(workTeam => workTeam.Workers)
        .ThenInclude(worker => worker.Craft)
      .Include(workTeam => workTeam.Workers)
        .ThenInclude(worker => worker.QualificationLevel);
  }
}
