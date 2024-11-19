using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Web.Prop.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Prop.Mapping;

public sealed class CounterpartMapper : IMapper<CounterpartInput, Counterpart>
{
  public Counterpart? Map(CounterpartInput? from, Counterpart? into)
  {
    if (from is null)
    {
      return null;
    }

    var counterpart = into ?? new Counterpart();
    counterpart.SetSubjectId(from.SubjectId);
    counterpart.SetIsMainCounterpart(from.IsMainCounterpart);
    counterpart.SetContractSharePercent(from.ContractSharePercent);
    counterpart.SetSince(from.Since);
    counterpart.SetUntil(from.Until);
    counterpart.SetType(from.Type);

    return counterpart;
  }

  Task<Counterpart?> IMapper<CounterpartInput, Counterpart>.MapAsync(
    CounterpartInput? from,
    Counterpart? into,
    CancellationToken cancellationToken)
    => Task.FromResult(Map(from, into));
}
