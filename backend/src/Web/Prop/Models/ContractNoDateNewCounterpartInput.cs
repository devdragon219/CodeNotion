using RealGimm.Core.Prop.ContractAggregate;

namespace RealGimm.Web.Prop.Models;

public sealed record ContractNoDateNewCounterpartInput
{
  public int SubjectId { get; set; }
  public bool IsMainCounterpart { get; set; }
  public double ContractSharePercent { get; set; }
  public CounterpartType? Type { get; set; } = CounterpartType.Regular;
}
