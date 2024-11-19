using RealGimm.Core.Fclt.PriceListAggregate;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Fclt.Mapping;

public class PriceListMapper : IMapper<PriceListInput, PriceList>
{
  public PriceList? MapAsync(PriceListInput? from, PriceList? into = null)
  {
    if (from is null)
    {
      return null;
    }

    var priceList = into ?? new PriceList();
    priceList.SetName(from.Name);
    priceList.SetInternalCode(from.InternalCode);
    priceList.SetOrdering(from.Ordering);
    priceList.SetIsDefault(from.IsDefault);

    return priceList;
  }

  Task<PriceList?> IMapper<PriceListInput, PriceList>.MapAsync(
    PriceListInput? from,
    PriceList? into,
    CancellationToken cancellationToken)
    => Task.FromResult(MapAsync(from, into));
}
