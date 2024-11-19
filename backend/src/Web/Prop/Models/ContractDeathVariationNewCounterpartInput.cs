using RealGimm.Core.Prop.ContractAggregate;

namespace RealGimm.Web.Prop.Models;

public sealed record ContractDeathVariationNewCounterpartInput
{
  public int SubjectId { get; set; }
  public double ContractSharePercent { get; set; }
  public CounterpartType? Type { get; set; } = CounterpartType.Regular;
  public DateOnly TakeoverDate { get; set; }
  public bool IsMainCounterpart { get; set; }
}
