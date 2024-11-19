using RealGimm.Core.Fclt.WorkTeamAggregate;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Fclt.Services;

public class WorkTeamCodeSuggestionService : CodeSuggestorBase<WorkTeam>
{
  public WorkTeamCodeSuggestionService(IReadRepository<WorkTeam> repository) : base(repository)
  {
  }

  protected override string CreateCode(int unoccupiedNumber, WorkTeam? partialEntity)
    => $"SQ{unoccupiedNumber.ToString().PadLeft(2, '0')}";
}
