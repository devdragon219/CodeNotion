using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Web.Asst.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Asst.Mapping;

public class EstateMarketValueMapper : IMapper<EstateMarketValueInput, EstateMarketValue>
{
  public Task<EstateMarketValue?> MapAsync(EstateMarketValueInput? from, EstateMarketValue? into, CancellationToken cancellationToken = default)
    => Task.FromResult(Map(from, into));

  private static EstateMarketValue? Map(EstateMarketValueInput? from, EstateMarketValue? into)
  {
    if (from is null)
    {
      return null;
    }

    var marketValue = into ?? new EstateMarketValue();
    marketValue.SetData(from.Type, from.Value);

    if (into is null && from.Id.GetValueOrDefault() != default)
    {
      marketValue.Id = from.Id!.Value;
    }

    return marketValue;
  }
}
