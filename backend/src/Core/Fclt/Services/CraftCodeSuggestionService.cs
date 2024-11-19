using RealGimm.Core.Fclt.CraftAggregate;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Fclt.Services;

public class CraftCodeSuggestionService : CodeSuggestorBase<Craft>
{
  public CraftCodeSuggestionService(IReadRepository<Craft> repository) : base(repository)
  {
  }

  protected override string CreateCode(int unoccupiedNumber, Craft? partialEntity)
    => $"SP{unoccupiedNumber.ToString().PadLeft(2, '0')}";
}
