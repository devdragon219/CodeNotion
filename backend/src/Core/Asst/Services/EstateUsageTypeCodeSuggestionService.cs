using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Asst.Services;
public class EstateUsageTypeSuggestionService : CodeSuggestorBase<EstateUsageType>
{
  public EstateUsageTypeSuggestionService(IReadRepository<EstateUsageType> repository) : base(repository)
  {
  }

  protected override string CreateCode(int unoccupiedNumber, EstateUsageType? partialEntity)
    => $"U{unoccupiedNumber.ToString().PadLeft(2, '0')}";
}