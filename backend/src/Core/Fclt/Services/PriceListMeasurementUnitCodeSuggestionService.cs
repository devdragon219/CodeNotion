using RealGimm.Core.Fclt.PriceListMeasurementUnitAggregate;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Fclt.Services;

public class PriceListMeasurementUnitCodeSuggestionService : CodeSuggestorBase<PriceListMeasurementUnit>
{
  public PriceListMeasurementUnitCodeSuggestionService(IReadRepository<PriceListMeasurementUnit> repository)
    : base(repository)
  {
  }

  protected override string CreateCode(int unoccupiedNumber, PriceListMeasurementUnit? partialEntity)
    => $"UL{unoccupiedNumber.ToString().PadLeft(2, '0')}";
}
