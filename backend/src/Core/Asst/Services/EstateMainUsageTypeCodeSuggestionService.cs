using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Asst.Services;
public class EstateMainUsageTypeSuggestionService : CodeSuggestorBase<EstateMainUsageType>
{
  public EstateMainUsageTypeSuggestionService(IReadRepository<EstateMainUsageType> repository) : base(repository)
  {
  }

  protected override string CreateCode(int unoccupiedNumber, EstateMainUsageType? partialEntity)
    => $"MU{unoccupiedNumber.ToString().PadLeft(2, '0')}";
}