using Ardalis.Specification;

namespace RealGimm.Core.Fclt.WorkTeamAggregate.Specifications;

public class WorkTeamIncludeForExportToExcelSpec : Specification<WorkTeam>
{
  public WorkTeamIncludeForExportToExcelSpec()
  {
    Query
      .Include(workTeam => workTeam.Workers)
        .ThenInclude(worker => worker.Craft)
      .Include(workTeam => workTeam.Workers)
        .ThenInclude(worker => worker.QualificationLevel);
  }
}
