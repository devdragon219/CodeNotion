using RealGimm.Web.Nrgy.Models;
using RealGimm.WebCommons.Mapping;
using RealGimm.Core.Nrgy.CostChargeAggregate;
using RealGimm.Core.Nrgy.ReadingAggregate;

namespace RealGimm.Web.Nrgy.Mapping;

public sealed class ReadingValueMapper : IMapper<ReadingValueInput, ReadingValue>
{
  public ReadingValue? Map(ReadingValueInput? from, ReadingValue? into)
  {
    if (from is null)
    {
      return null;
    }

    var readingValue = into ?? new ReadingValue();
    readingValue.SetValues(from.TOURateIndex, from.Value);

    return readingValue;
  }

  Task<ReadingValue?> IMapper<ReadingValueInput, ReadingValue>.MapAsync(
    ReadingValueInput? from,
    ReadingValue? into,
    CancellationToken cancellationToken)
    => Task.FromResult(Map(from, into));
}
