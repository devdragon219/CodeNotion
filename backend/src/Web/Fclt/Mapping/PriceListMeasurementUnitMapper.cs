using RealGimm.Core.Fclt.PriceListMeasurementUnitAggregate;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Fclt.Mapping;

public class PriceListMeasurementUnitMapper : IMapper<PriceListMeasurementUnitInput, PriceListMeasurementUnit>
{
  public PriceListMeasurementUnit? MapAsync(PriceListMeasurementUnitInput? from, PriceListMeasurementUnit? into = null)
  {
    if (from is null)
    {
      return null;
    }

    var craft = into ?? new PriceListMeasurementUnit();
    craft.SetName(from.Name);
    craft.SetInternalCode(from.InternalCode);
    craft.SetOrdering(from.Ordering);

    return craft;
  }

  Task<PriceListMeasurementUnit?> IMapper<PriceListMeasurementUnitInput, PriceListMeasurementUnit>.MapAsync(
    PriceListMeasurementUnitInput? from,
    PriceListMeasurementUnit? into,
    CancellationToken cancellationToken)
    => Task.FromResult(MapAsync(from, into));
}
