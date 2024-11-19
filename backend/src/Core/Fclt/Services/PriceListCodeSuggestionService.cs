using RealGimm.Core.Fclt.PriceListAggregate;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Fclt.Services;

public class PriceListCodeSuggestionService : CodeSuggestorBase<PriceList>
{
  public PriceListCodeSuggestionService(IReadRepository<PriceList> repository) : base(repository)
  {
  }

  protected override string CreateCode(int unoccupiedNumber, PriceList? partialEntity)
    => $"LS{unoccupiedNumber.ToString().PadLeft(4, '0')}";
}
