using RealGimm.Core.Common.VATRateAggregate;
using RealGimm.Web.Common.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Common.Mapping;

public sealed class VATRateMapper : IMapper<VATRateInput, VATRate>
{
  public VATRate? Map(VATRateInput? from, VATRate? into)
  {
    if (from is null)
    {
      return null;
    }

    var vatRate = into ?? new VATRate();
    vatRate.SetInternalCode(from.InternalCode);
    vatRate.SetDescription(from.Description);
    vatRate.SetType(from.Type);
    vatRate.SetRatePercent(from.RatePercent);

    if (into is null && from.Id.GetValueOrDefault() != default)
    {
      vatRate.Id = from.Id!.Value;
    }

    return vatRate;
  }

  Task<VATRate?> IMapper<VATRateInput, VATRate>.MapAsync(
    VATRateInput? from,
    VATRate? into,
    CancellationToken cancellationToken)
    => Task.FromResult(Map(from, into));
}
