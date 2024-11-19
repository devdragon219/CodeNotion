
using RealGimm.Core.Shared.Services;
using RealGimm.Core.Nrgy.UtilityTypeAggregate;

namespace RealGimm.Core.Nrgy.Services;

public class UtilityTypeSuggestionService : CodeSuggestorBase<UtilityType>
{
  public UtilityTypeSuggestionService(IReadRepository<UtilityType> repository) : base(repository)
  {
  }

  protected override string CreateCode(int unoccupiedNumber, UtilityType? partialEntity)
    => $"TF{unoccupiedNumber.ToString().PadLeft(3, '0')}";
}
