using RealGimm.Core.Fclt.InterventionTypeAggregate;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Fclt.Services;

public class InterventionTypeCodeSuggestionService : CodeSuggestorBase<InterventionType>
{
  public InterventionTypeCodeSuggestionService(IReadRepository<InterventionType> repository) : base(repository)
  {
  }

  protected override string CreateCode(int unoccupiedNumber, InterventionType? partialEntity)
    => $"TI{unoccupiedNumber.ToString().PadLeft(2, '0')}";
}
