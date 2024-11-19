using RealGimm.Core.Nrgy.UtilityServiceAggregate;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Nrgy.Services;

public class UtilityServiceCodeSuggestionService : CodeSuggestorBase<UtilityService>
{
  public UtilityServiceCodeSuggestionService(IReadRepository<UtilityService> repository) : base(repository)
  {
  }

  protected override string CreateCode(int unoccupiedNumber, UtilityService? partialEntity)
    => $"F{unoccupiedNumber.ToString().PadLeft(5, '0')}";
}
