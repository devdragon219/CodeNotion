using RealGimm.Core.Fclt.PenaltyAggregate;
using RealGimm.Web.Fclt.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Fclt.Mapping;

public class PenaltyValueMapper : IMapper<PenaltyValueInput, PenaltyValue>
{
  public PenaltyValue? MapAsync(PenaltyValueInput? from, PenaltyValue? into)
  {
    if (from is null)
    {
      return null;
    }

    var penaltyValue = into ?? new PenaltyValue() { Id = from.Id.GetValueOrDefault() };
    penaltyValue.SetAmount(from.Amount);
    penaltyValue.SetType(from.Type);

    return penaltyValue;
  }

  public Task<PenaltyValue?> MapAsync(
    PenaltyValueInput? from,
    PenaltyValue? into,
    CancellationToken cancellationToken)
    => Task.FromResult(MapAsync(from, into));
}
