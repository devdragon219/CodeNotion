using RealGimm.Core.Common.VATRateAggregate;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Common.Services;

public class VATRateCodeSuggestionService : CodeSuggestorBase<VATRate>
{
  public VATRateCodeSuggestionService(IReadRepository<VATRate> repository) : base(repository)
  {
  }

  protected override string CreateCode(int unoccupiedNumber, VATRate? partialEntity)
    => $"IVA{unoccupiedNumber.ToString().PadLeft(3, '0')}";
}
