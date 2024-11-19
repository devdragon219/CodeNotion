using RealGimm.Core.Fclt.EstateUnitGroupAggregate;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Fclt.Services;

public class EstateUnitGroupCodeSuggestionService : CodeSuggestorBase<EstateUnitGroup>
{
  public EstateUnitGroupCodeSuggestionService(IReadRepository<EstateUnitGroup> repository) : base(repository)
  {
  }

  protected override string CreateCode(int unoccupiedNumber, EstateUnitGroup? partialEntity)
    => $"L{unoccupiedNumber.ToString().PadLeft(5, '0')}";
}
