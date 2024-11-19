using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Web.Asst.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Asst.Mapping;

public class EstateTotalMarketValueCoefficientMapper : IMapper<EstateTotalMarketValueCoefficientInput, EstateTotalMarketValueCoefficient>
{
  public Task<EstateTotalMarketValueCoefficient?> MapAsync(EstateTotalMarketValueCoefficientInput? from, EstateTotalMarketValueCoefficient? into, CancellationToken cancellationToken = default)
    => Task.FromResult(Map(from, into));

  private static EstateTotalMarketValueCoefficient? Map(EstateTotalMarketValueCoefficientInput? from, EstateTotalMarketValueCoefficient? into)
  {
    if (from is null)
    {
      return null;
    }

    var coefficient = into ?? new EstateTotalMarketValueCoefficient();
    coefficient.SetData(from.Type, from.Value);

    if (into is null && from.Id.GetValueOrDefault() != default)
    {
      coefficient.Id = from.Id!.Value;
    }

    return coefficient;
  }
}
